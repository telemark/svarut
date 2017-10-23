[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/telemark/node-svarut.svg?branch=master)](https://travis-ci.org/telemark/node-svarut)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/node-svarut.svg)](https://greenkeeper.io/)

# node-svarut

Node module for SvarUt

More information on SvarUt [here](https://github.com/ks-no/svarut-dokumentasjon/wiki)

This module cover all methods in [ForsendelsesServiceV7](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV7?wsdl)

See the [wiki](https://github.com/telemark/node-svarut/wiki) for field descriptions.

## Installation
From npm

```sh
$ npm i node-svarut
```

From GitHub
```sh
$ git clone git@github.com:telemark/node-svarut.git
```

cd into directory and run install

```sh
$ npm i
```

## Usage

### sendForsendelse (simple)

See [sendForsendelse.js](examples/sendForsendelse.js)

Returns an array of ids

```js
['b53d8d15-75e8-4536-84d2-c275cc63f47e']
```

### sendForsendelse (advanced)

See [sendForsendelse.js](examples/sendForsendelse_advanced.js)

Returns an array of ids

```js
['b53d8d15-75e8-4536-84d2-c275cc63f47e']
```

### retrieveForsendelseStatus

See [retrieveForsendelseStatus.js](examples/retrieveForsendelseStatus.js)

Returns

```js
{
  "forsendelseStatus": [
    "SENDT_PRINT"
  ],
  "forsendelsesid": [
    "718e95b5-49dd-463b-8a5d-35aee3ee9850"
  ],
  "sisteStatusEndring": [
    "2017-10-18T15:43:45.978+02:00"
  ]
}
```

### retrieveForsendelseStatuser

See [retrieveForsendelseStatuser.js](examples/retrieveForsendelseStatuser.js)

Returns

```js
[
  {
    "forsendelseStatus": [
      "SENDT_PRINT"
    ],
    "forsendelsesid": [
      "718e95b5-49dd-463b-8a5d-35aee3ee9850"
    ],
    "sisteStatusEndring": [
      "2017-10-18T15:43:45.978+02:00"
    ]
  },
  {
    "forsendelseStatus": [
      "SENDT_PRINT"
    ],
    "forsendelsesid": [
      "63313040-7b07-442f-a891-df0b2edf41d9"
    ],
    "sisteStatusEndring": [
      "2017-08-21T15:56:58.385+02:00"
    ]
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
        "hendelse": [
          "Mottatt, og tildelt forsendelse-id"
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Metadata er validert OK"
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Orginaldokumenter er lagret (1 dokument)"
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Forsendelsesfil generert"
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Akseptert for ekspedering"
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Mottaker 01029400470 er registert i kontaktregister, men har ikke registrert postkasse."
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Varsling sendt til Altinn"
        ],
        "tidspunkt": [
          "18.10.2017 13:43:31"
        ]
      },
      {
        "hendelse": [
          "Lesefrist utløpt."
        ],
        "tidspunkt": [
          "18.10.2017 15:43:45"
        ]
      },
      {
        "hendelse": [
          "Sendt til manuell print"
        ],
        "tidspunkt": [
          "18.10.2017 15:43:45"
        ]
      }
    ]
  }
]
```

### retrieveForsendelseIdByEksternRef

See [retrieveForsendelseIdByEksternRef.js](examples/retrieveForsendelseIdByEksternRef.js)

Not tested

### setForsendelseLestAvEksterntSystem

See [setForsendelseLestAvEksterntSystem.js](examples/setForsendelseLestAvEksterntSystem.js)

Not tested
