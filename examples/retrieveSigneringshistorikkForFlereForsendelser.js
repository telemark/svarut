const svarUt = require('../src/index')
const options = {
  config: {
    url: process.env.SVARUT_URL || 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9'
  },
  query: {
    forsendelseider: ['718e95b5-49dd-463b-8a5d-35aee3ee9850', '2422cb25-bef1-4cd8-962c-3109e799dde7']
  }
}

svarUt.retrieveSigneringshistorikkForFlereForsendelser(options)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error(error))
