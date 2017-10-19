const svarUt = require('../index')
const fs = require('fs')

const options = {
  config: {
    url: process.env.SVARUT_URL || 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV7'
  },
  query: {
    dokumenter: [
      {
        data: fs.readFileSync('../test/data/skoleskyss_avslag_vedtak.pdf').toString('base64'), // Must be base64
        filnavn: 'skoleskyss_avslag_vedtak.pdf',
        mimetype: 'application/pdf'
      }
    ],
    avgivendeSystem: 'node-svarut test',
    konteringskode: '1111',
    krevNiva4Innlogging: false,
    kryptert: false,
    tittel: 'SvarUt testdokument',
    kunDigitalLevering: false,
    printkonfigurasjon: {
      brevtype: 'BPOST',
      fargePrint: true,
      tosidig: false
    },
    mottaker: [
      {
        navn: 'Terje Tverrtryne',
        adresse1: 'Skogsveien 42',
        adresse2: '',
        adresse3: '',
        postnr: '3710',
        poststed: 'Skien',
        fodselsnr: '01029400475'
        // orgnr: '940192226' // Hvis organisasjon
      },
      {
        navn: 'Terje Tverrtryne2',
        adresse1: 'Skogsveien 42',
        adresse2: '',
        adresse3: '',
        postnr: '3710',
        poststed: 'Skien',
        fodselsnr: '01029400460'
        // orgnr: '940192226' // Hvis organisasjon
      }
    ]
  }
}

svarUt.sendForsendelse(options)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error(error))
