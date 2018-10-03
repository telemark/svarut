const svarUt = require('../src/index')
const fs = require('fs')

const options = {
  config: {
    url: process.env.SVARUT_URL || 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9'
  },
  query: {
    dokumenter: [
      {
        data: fs.readFileSync('../test/data/skoleskyss_avslag_vedtak.pdf').toString('base64'), // Must be base64
        filnavn: 'skoleskyss_avslag_vedtak.pdf',
        mimetype: 'application/pdf'
      }
    ],
    tittel: 'SvarUt testdokument',
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
    eksternref: 11,
    forsendelseType: 'string',
    lenker: [
      {
        ledetekst: 'string',
        urlLenke: 'string',
        urlTekst: 'string'
      }
    ],
    metadataForImport: {
      dokumentetsDato: new Date().toISOString(),
      journalposttype: 'string',
      journalstatus: 'string',
      saksaar: 11,
      sakssekvensnummer: 11,
      tittel: 'string'
    },
    metadataFraAvleverendeSystem: {
      dokumentetsDato: new Date().toISOString(),
      ekstraMetadata: [
        {
          key: 'string',
          value: 'string'
        }
      ],
      journalaar: 11,
      journaldato: new Date().toISOString(),
      journalpostnummer: 11,
      journalposttype: 'string',
      journalsekvensnummer: 11,
      journalstatus: 'string',
      saksaar: 111,
      saksbehandler: 111,
      sakssekvensnummer: 111,
      tittel: 'string'
    },
    signaturtype: 'AUTENTISERT_SIGNATUR',
    signeringUtloper: new Date().toISOString(),
    svarPaForsendelse: 'http://google.no',
    svarPaForsendelseLink: false,
    svarSendesTil: {
      navn: 'Terje Tverrtryne',
      adresse1: 'Skogsveien 42',
      adresse2: '',
      adresse3: '',
      postnr: '3710',
      poststed: 'Skien',
      fnr: '01029400470'
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
        // orgnr: '940192226' // Hvis organisasjon
      }
    ]
  }
}

svarUt.sendForsendelse(options)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error(error))
