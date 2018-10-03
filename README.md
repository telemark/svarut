[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/telemark/svarut.svg?branch=master)](https://travis-ci.org/telemark/svarut)

# svarut

Node module for SvarUt

More information on SvarUt [here](https://github.com/ks-no/svarut-dokumentasjon/wiki)

This module cover all methods in [ForsendelsesServiceV9](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9?wsdl)

See the [wiki](https://github.com/telemark/svarut/wiki) for field descriptions.

## Installation
From npm

```sh
$ npm i svarut
```

From GitHub
```sh
$ git clone git@github.com:telemark/svarut.git
```

cd into directory and run install

```sh
$ npm i
```

## Usage

### sendForsendelse (simple)

See [sendForsendelse.js](examples/sendForsendelse.js)

Returns
```js
["b53d8d15-75e8-4536-84d2-c275cc63f47e"]
```

### sendForsendelse (advanced)

See [sendForsendelse_advanced.js](examples/sendForsendelse_advanced.js)

Returns

```js
["b53d8d15-75e8-4536-84d2-c275cc63f47e", "718e95b5-49dd-463b-8a5d-35aee3ee9850"]
```

### sendForsendelse (singeringsjobb)

See [sendForsendelseSignatur.js](examples/sendForsendelseSignatur.js)

Returns

```js
["b53d8d15-75e8-4536-84d2-c275cc63f47e", "718e95b5-49dd-463b-8a5d-35aee3ee9850"]
```

### retrieveForsendelseStatus

See [retrieveForsendelseStatus.js](examples/retrieveForsendelseStatus.js)

Returns

```js
"LEST"
```

### retrieveForsendelseStatuser

See [retrieveForsendelseStatuser.js](examples/retrieveForsendelseStatuser.js)

Returns

```js
[
  {
    "forsendelseStatus": "LEST",
    "forsendelsesid": "718e95b5-49dd-463b-8a5d-35aee3ee9850",
    "sisteStatusEndring": "2017-10-18T23:21:18.398+02:00"
  },
  {
    "forsendelseStatus": "SENDT_PRINT",
    "forsendelsesid": "63313040-7b07-442f-a891-df0b2edf41d9",
    "sisteStatusEndring": "2017-08-21T15:56:58.385+02:00"
  }
]
```

### retrieveForsendelseHistorikk

See [retrieveForsendelseHistorikk.js](examples/retrieveForsendelseHistorikk.js)

Returns

```js
{
  "hendelsesLogg": [
    {
      "hendelse": "Mottatt, og tildelt forsendelse-id",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Metadata er validert OK",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Orginaldokumenter er lagret (1 dokument)",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Forsendelsesfil generert",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Akseptert for ekspedering",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Mottaker 01029400470 er registert i kontaktregister, men har ikke registrert postkasse.",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Varsling sent til Altinn. Forsendelsen vil ettersendes som brevpost dersom den ikke blir lest innen utløp av lesefristen. Lesefristen utløper etter 2 timer.",
      "tidspunkt": "18.10.2017 13:43:31"
    },
    {
      "hendelse": "Lesefrist utløpt.",
      "tidspunkt": "18.10.2017 15:43:45"
    },
    {
      "hendelse": "Sendt til manuell print",
      "tidspunkt": "18.10.2017 15:43:45"
    },
    {
      "hendelse": "Lest eksternt 18.10.2017 23:21:41 av 11111111111 hos avsender 0800_telemark_test i systemet 'arkiv'",
      "tidspunkt": "18.10.2017 23:21:18"
    }
  ]
}
```

### retrieveForsendelseIdByEksternRef

See [retrieveForsendelseIdByEksternRef.js](examples/retrieveForsendelseIdByEksternRef.js)

Not tested

### setForsendelseLestAvEksterntSystem

See [setForsendelseLestAvEksterntSystem.js](examples/setForsendelseLestAvEksterntSystem.js)

Not tested

### retrieveMottakerSystemForOrgnr

Not tested

### retrieveSigneringshistorikkForFlereForsendelser

See [retrieveSigneringshistorikkForFlereForsendelser.js](examples/retrieveSigneringshistorikkForFlereForsendelser.js)

```js
{
  "forsendelseid": [
    "2422cb25-bef1-4cd8-962c-3109e799dde7",
    "85272059-2d43-4c7d-b03a-0a68c5f1bb3e"
  ],
  "logg": [
    {
      "tidspunkt": "11.04.2018 10:08:25",
      "type": "SigneringsoppdragRegistrert",
      "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
    },
    {
      "tidspunkt": "11.04.2018 10:08:25",
      "type": "SigneringsoppdragRegistrert",
      "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
    }
  ]
}
```

### retrieveSigneringshistorikk

See [retrieveSigneringshistorikk.js](examples/retrieveSigneringshistorikk.js)

#### Ikke startet signering

```js
{
  "forsendelseid": "bd7d0e68-7934-41f4-8490-dea6c6179477",
  "logg": {
    "tidspunkt": "11.04.2018 09:48:20",
    "type": "SigneringsoppdragRegistrert",
    "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
  }
}
```

#### Godtatt signering

```js
{
  "forsendelseid": "bd7d0e68-7934-41f4-8490-dea6c6179477",
  "logg": [
    {
      "tidspunkt": "11.04.2018 09:48:20",
      "type": "SigneringsoppdragRegistrert",
      "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
    },
    {
      "tidspunkt": "11.04.2018 09:57:28",
      "type": "SigneringsoppdragStartet",
      "hendelse": "Mottaker starter signeringsoppdraget."
    },
    {
      "tidspunkt": "11.04.2018 09:58:18",
      "type": "SigneringsoppdragFullfort",
      "hendelse": "Mottaker har fullført signeringsoppdraget og svar er sendt tilbake til avsender. Referanse: e324e614-4998-453b-a7a0-fba5cfa20ed0"
    }
  ]
}
```

#### Avvist signering

```js
{
  "forsendelseid": "ae9c9013-55f4-4059-87a9-beb860add58d",
  "logg": [
    {
      "tidspunkt": "11.04.2018 09:48:20",
      "type": "SigneringsoppdragRegistrert",
      "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
    },
    {
      "tidspunkt": "11.04.2018 10:01:05",
      "type": "SigneringsoppdragStartet",
      "hendelse": "Mottaker starter signeringsoppdraget."
    },
    {
      "tidspunkt": "11.04.2018 10:01:23",
      "type": "SigneringsoppdragAvvistAvMottaker",
      "hendelse": "Mottaker har avvist signeringsoppdraget."
    }
  ]
}
```

### startNyForsendelse

Not tested


