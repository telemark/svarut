const EasyXml = require('easyxml')
const ws = require('ws.js-buffer-fix')
const { promisify } = require('util')
const parseString = promisify(require('xml2js').parseString)

const serializer = new EasyXml({
  rootElement: 'soap:Envelope',
  indent: 0,
  unwrapArrays: true,
  filterNulls: true
})

module.exports = async options => {
  const opts = JSON.parse(JSON.stringify(options))
  const { query, config, action } = opts
  const dokumenter = query.forsendelse ? query.forsendelse._dokumenter : false
  if (dokumenter) {
    delete opts.query.forsendelse._dokumenter
  }
  const envelope = createEnvelope(query, action)
  const xml = jsToXml(envelope)
  try {
    const ctx = await sendRequest(xml, config.url, dokumenter)
    return xmlToJs(ctx)
  } catch (error) {
    throw error
  }
}

function createEnvelope (query, action) {
  return {
    '_xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
    'soap:Body': {
      [`ns2:${action}`]: {
        '_xmlns:ns2': 'http://www.ks.no/svarut/servicesV7',
        ...query
      }
    }
  }
}

function jsToXml (obj) {
  let xml = serializer.render(obj)
  xml = xml.replace(/\n/g, '')
  return xml
}

function sendRequest (xml, url, dokumenter) {
  function addFiles (wsRequest, dokumenter) {
    dokumenter.map((dokument, i) => {
      const xpath = `//data[${++i}]`
      ws.addAttachment(wsRequest, 'request', xpath, dokument.data, dokument.mimetype)
    })
  }

  return new Promise((resolve, reject) => {
    const handlers = [
      new ws.Http(),
      new ws.Mtom()
    ]

    const wsRequest = {
      request: xml,
      url: url,
      contentType: 'application/soap+xml'
    }

    if (dokumenter) {
      addFiles(wsRequest, dokumenter)
    }

    ws.send(handlers, wsRequest, ctx => {
      ctx.statusCode === 200 ? resolve(ctx.response) : reject(ctx.response)
    })
  })
}

async function xmlToJs (ctx) {
  try {
    const xml = ctx.match(/<return>(.*?)<\/return>/g)
    if (!xml) {
      return false
    } else {
      const obj = await parseString(`<body>${xml.join('')}</body>`)
      const result = obj.body.return
      return result
    }
  } catch (error) {
    throw error
  }
}
