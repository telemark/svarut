const wsSend = require('./lib')

function setMottaker (mottaker) {
  const type = mottaker.fodselsnr ? 'privatPerson' : 'organisasjon'

  return {
    '_xsi:type': 'ns2:' + type,
    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    ...mottaker
  }
}

function setDokumenter (dokumenter) {
  return dokumenter.map(dokument => {
    return {
      data: '',
      filnavn: dokument.filnavn,
      mimetype: dokument.mimetype
    }
  })
}

exports.sendForsendelse = options => {
  options.action = 'sendForsendelse'
  options._dokumenter = Object.assign([], options.query.dokumenter)
  options.query.dokumenter = setDokumenter(options.query.dokumenter)
  if (options.query.svarSendesTil) {
    options.query.svarSendesTil = setMottaker(options.query.svarSendesTil)
  }

  async function createJobs (mottaker) {
    let opts = Object.assign({}, options)
    opts.query.mottaker = setMottaker(mottaker)
    opts.query = { forsendelse: opts.query }
    return await wsSend(opts)
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
