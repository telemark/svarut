const EasyXml = require('easyxml')
const ws = require('ws.js-buffer-fix')
const Parser = require('xml2js-parser')
const parser = new Parser({trim: true, explicitArray: false})
const serializer = new EasyXml({
  rootElement: 'soap:Envelope',
  indent: 0,
  unwrapArrays: true,
  filterNulls: true
})

module.exports = async options => {
  const { query, config, action } = options
  const dokumenter = options._dokumenter ? options._dokumenter : false
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
      try {
        const obj = parser.parseStringSync(`<body>${xml.join('')}</body>`)
        const result = obj.body.return
        return result
      } catch (error) {
        throw error
      }
    }
  } catch (error) {
    throw error
  }
}
