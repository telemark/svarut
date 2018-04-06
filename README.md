[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/telemark/svarut.svg?branch=master)](https://travis-ci.org/telemark/svarut)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/svarut.svg)](https://greenkeeper.io/)

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

Not tested

### retrieveSigneringshistorikk

Not tested

### startNyForsendelse

Not tested


