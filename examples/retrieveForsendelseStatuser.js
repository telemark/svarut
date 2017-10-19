const svarUt = require('../index')
const options = {
  config: {
    url: process.env.SVARUT_URL || 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV7'
  },
  query: {
    forsendelseider: ['718e95b5-49dd-463b-8a5d-35aee3ee9850', '63313040-7b07-442f-a891-df0b2edf41d9']
  }
}

svarUt.retrieveForsendelseStatuser(options)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error(error))
