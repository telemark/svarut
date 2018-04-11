const wsSend = require('./lib')

function setPostAdresse (mottaker) {
  delete mottaker.fnr
  delete mottaker.orgnr
  return mottaker
}

function setDigitalAdresse (mottaker) {
  if (mottaker.fnr) {
    return {
      '_xsi:type': 'ns2:personDigitalAdresse',
      '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      fnr: mottaker.fnr
    }
  }
  return {
    '_xsi:type': 'ns2:organisasjonDigitalAdresse',
    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    orgnr: mottaker.orgnr
  }
}

function setDokumenter (dokumenter) {
  return dokumenter.map(dokument => {
    return {
      data: '',
      filnavn: dokument.filnavn,
      mimetype: dokument.mimetype,
      skalSigneres: dokument.skalSigneres || false,
      dokumentType: dokument.dokumentType || undefined,
      ekskluderesFraPrint: dokument.ekskluderesFraPrint || false
    }
  })
}

exports.sendForsendelse = options => {
  options.action = 'sendForsendelse'
  options._dokumenter = Object.assign([], options.query.dokumenter)
  options.query.dokumenter = setDokumenter(options.query.dokumenter)
  if (options.query.svarSendesTil) {
    options.query.svarSendesTil = {
      digitalAdresse: setDigitalAdresse(options.query.svarSendesTil),
      postAdresse: setPostAdresse(options.query.svarSendesTil)
    }
  }

  async function createJobs (mottaker) {
    const opts = {
      config: options.config,
      action: options.action,
      _dokumenter: options._dokumenter,
      query: {
        forsendelse: {
          ...options.query,
          mottaker: {
            digitalAdresse: setDigitalAdresse(mottaker),
            postAdresse: setPostAdresse(mottaker)
          }
        }
      }
    }
    return wsSend(opts)
  }
  const jobs = Array.isArray(options.query.mottaker) ? options.query.mottaker.map(createJobs) : [createJobs(options.query.mottaker)]

  return Promise.all(jobs)
}

exports.retrieveForsendelseStatus = options => {
  options.action = 'retrieveForsendelseStatus'
  return wsSend(options)
}

exports.retrieveForsendelseStatuser = options => {
  options.action = 'retrieveForsendelseStatuser'
  return wsSend(options)
}

exports.retrieveForsendelseHistorikk = options => {
  options.action = 'retrieveForsendelseHistorikk'
  return wsSend(options)
}

exports.retrieveForsendelseIdByEksternRef = options => {
  options.action = 'retrieveForsendelseIdByEksternRef'
  return wsSend(options)
}

exports.setForsendelseLestAvEksterntSystem = options => {
  options.action = 'setForsendelseLestAvEksterntSystem'
  return wsSend(options)
}

exports.retrieveForsendelseTyper = options => {
  options.action = 'retrieveForsendelseTyper'
  return wsSend(options)
}

exports.retrieveForsendelseIdByEksternRef = options => {
  options.action = 'retrieveForsendelseIdByEksternRef'
  return wsSend(options)
}

exports.retrieveSigneringshistorikkForFlereForsendelser = options => {
  options.action = 'retrieveSigneringshistorikkForFlereForsendelser'
  return wsSend(options)
}

exports.retrieveSigneringshistorikk = options => {
  options.action = 'retrieveSigneringshistorikk'
  return wsSend(options)
}

exports.startNyForsendelse = options => {
  options.action = 'startNyForsendelse'
  return wsSend(options)
}
