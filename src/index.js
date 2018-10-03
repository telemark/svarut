const wsSend = require('./lib')

const setPostAdresse = mottaker => {
  delete mottaker.fnr
  delete mottaker.orgnr
  return mottaker
}

const setDigitalAdresse = mottaker => {
  return mottaker.fnr
    ? {
      '_xsi:type': 'ns2:personDigitalAdresse',
      '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      fnr: mottaker.fnr
    }
    : {
      '_xsi:type': 'ns2:organisasjonDigitalAdresse',
      '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
    }
}

const setDokumenter = dokumenter => dokumenter.map(dokument => (
  {
    data: '',
    filnavn: dokument.filnavn,
    mimetype: dokument.mimetype,
    skalSigneres: dokument.skalSigneres || false,
    dokumentType: dokument.dokumentType || undefined,
    ekskluderesFraPrint: dokument.ekskluderesFraPrint || false
  })
)

const sendForsendelse = exports.sendForsendelse = options => {
  options.action = options.action || 'sendForsendelse'
  options._dokumenter = Object.assign([], options.query.dokumenter)
  options.query.dokumenter = setDokumenter(options.query.dokumenter)
  if (options.query.svarSendesTil) {
    options.query.svarSendesTil = {
      digitalAdresse: setDigitalAdresse(options.query.svarSendesTil),
      postAdresse: setPostAdresse(options.query.svarSendesTil)
    }
  }

  const createJobs = async mottaker => {
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

exports.sendForsendelseMedId = options => {
  options.action = 'sendForsendelseMedId'
  return sendForsendelse(options)
}

exports.retrieveForsendelsesStatus = options => {
  options.action = 'retrieveForsendelsesStatus'
  return wsSend(options)
}

exports.retrieveForsendelsesStatuser = options => {
  options.action = 'retrieveForsendelsesStatuser'
  return wsSend(options)
}

exports.retrieveForsendelsesHistorikk = options => {
  options.action = 'retrieveForsendelsesHistorikk'
  return wsSend(options)
}

exports.retrieveForsendelsesIderByEksternRef = options => {
  options.action = 'retrieveForsendelsesIderByEksternRef'
  return wsSend(options)
}

exports.setForsendelseLestAvEksterntSystem = options => {
  options.action = 'setForsendelseLestAvEksterntSystem'
  return wsSend(options)
}

exports.retrieveForsendelsesTyper = options => {
  options.action = 'retrieveForsendelsesTyper'
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

exports.retreiveForsendelsesTyper = options => {
  options.action = 'retreiveForsendelsesTyper'
  return wsSend(options)
}

exports.retrieveMottakerSystemForOrgnr = options => {
  options.action = 'retrieveMottakerSystemForOrgnr'
  return wsSend(options)
}

exports.retrieveForsendelsesIderByEksternRef = options => {
  options.action = 'retrieveForsendelsesIderByEksternRef'
  return wsSend(options)
}

exports.retrieveDokumentMetadata = options => {
  options.action = 'retrieveDokumentMetadata'
  return wsSend(options)
}
