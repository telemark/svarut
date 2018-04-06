const svarUt = require('../index')
const fs = require('fs')

const options = {
  config: {
    url: process.env.SVARUT_URL || 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9'
  },
  query: {
    dokumenter: [
      {
        data: fs.readFileSync('../test/data/skoleskyss_avslag_vedtak.pdf').toString('base64'), // Must be base64
        filnavn: 'sign.pdf',
        mimetype: 'application/pdf',
        skalSigneres: true
      }
    ],
    tittel: 'SvarUt test signeringsoppdrag',
    avgivendeSystem: 'node-svarut test',
    konteringskode: '1111',
    krevNiva4Innlogging: false,
    kryptert: false,
    kunDigitalLevering: false,
    printkonfigurasjon: {
      brevtype: 'BPOST',
      fargePrint: true,
      tosidig: false
    },
    signaturtype: 'AUTENTISERT_SIGNATUR',
    signeringUtloper: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    svarPaForsendelseLink: false,
    svarSendesTil: {
      orgnr: '940192226',
      navn: 'Telemark fylkeskommune',
      adresse1: 'Postboks 2844',
      postnr: '3702',
      poststed: 'Skien'
    },
    mottaker: [
      {
        navn: 'Terje Tverrtryne',
        adresse1: 'Skogsveien 42',
        adresse2: '',
        adresse3: '',
        postnr: '3710',
        poststed: 'Skien',
        fnr: '01029400470'
      }
    ]
  }
}

svarUt.sendForsendelse(options)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error(error))
