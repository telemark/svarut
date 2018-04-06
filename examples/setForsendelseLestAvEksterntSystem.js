const svarUt = require('../index')

const options = {
  config: {
    url: process.env.SVARUT_URL || 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9'
  },
  query: {
    forsendelsesid: '718e95b5-49dd-463b-8a5d-35aee3ee9850',
    lestAvFodselsnummer: '11111111111',
    navnPaEksterntSystem: 'arkiv',
    datoLest: new Date().toISOString()
  }
}

svarUt.setForsendelseLestAvEksterntSystem(options)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error(error))
