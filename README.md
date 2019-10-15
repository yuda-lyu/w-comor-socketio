# w-comor-socketio
A http and websocket communicator in nodejs and browser. Mapping functions from nodejs to other end points, like a simple RPC.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-comor-socketio.svg?style=flat)](https://npmjs.org/package/w-comor-socketio) 
[![Build Status](https://travis-ci.org/yuda-lyu/w-comor-socketio.svg?branch=master)](https://travis-ci.org/yuda-lyu/w-comor-socketio) 
[![license](https://img.shields.io/npm/l/w-comor-socketio.svg?style=flat)](https://npmjs.org/package/w-comor-socketio) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-comor-socketio/master/dist/si-server.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-comor-socketio)
[![npm download](https://img.shields.io/npm/dt/w-comor-socketio.svg)](https://npmjs.org/package/w-comor-socketio) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-comor-socketio.svg)](https://www.jsdelivr.com/package/npm/w-comor-socketio)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-comor-socketio/global.html).

## Parts
`w-comor-socketio` includes 2 parts: 
* `si-server`: for nodejs server
* `si-client`: for nodejs and browser client

## Installation
### Using npm(ES6 module):
> **Note:** `si-server` depends on `@hapi/hapi`, `@hapi/inert` and `socket.io`.

> **Note:** `si-client` depends on `socket.io-client` and `wolfy87-eventemitter`.

```alias
npm i w-comor-socketio
```
#### Example for `si-server`:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-comor-socketio/blob/master/srv.mjs)]
```alias
import SiServer from 'w-comor-socketio/dist/si-server.umd.js'

function random(min, max) {
    return Math.floor(Math.random() * max) + min
}

let opt = {
    port: 8080,
    authenticate: function(token) { 
        //authenticate user by token
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(true)
            }, 1000)
        })
    },
    filterFuncs: function(token, funcs) {
        //resolve funcs by authenticating user
        return new Promise(function(resolve, reject) {
            funcs = funcs.filter(function(v) {
                return v.indexOf('Hide') < 0
            })
            resolve(funcs)
        })
    },
    onClientChange: function(clients, opt) {
        console.log(`Server[port:${opt.port}] now clients: ${clients.length}`)
    },
    funcs: {
        'group.plus': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 * p2)
                }, random(100, 3000))
            })
        },
        'group.div': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 / p2)
                }, random(100, 3000))
            })
        },
        'add': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 + p2)
                }, random(100, 3000))
            })
        },
        'addHide': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 + p2)
                }, random(100, 3000))
            })
        },
        'minu': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 - p2)
                }, random(100, 3000))
            })
        },
    },
}

new SiServer(opt)
```
#### Example for `si-client`:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-comor-socketio/blob/master/scla.mjs)]
```alias
import SiClient from 'w-comor-socketio/dist/si-client.umd.js'

//opt
let opt = {
    url: 'http://localhost:8080',
    token: '*',
    open: function() {
        console.log('client nodejs: open')
    },
    close: function() {
        console.log('client nodejs: close')
    },
    error: function(err) {
        console.log('client nodejs: error:', err)
    },
    reconn: function() {
        console.log('client nodejs: reconn')
    },
}

//SiClient
new SiClient(opt)
    .then(function(wo) {
        console.log('client nodejs: funcs: ', wo)
        
        function core(ps) {
            wo.group.plus(ps)
                .then(function(r) {
                    console.log('client nodejs: plus(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: plus: catch: ', err)
                })
            wo.group.div(ps)
                .then(function(r) {
                    console.log('client nodejs: div(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: div: catch: ', err)
                })
            wo.add(ps)
                .then(function(r) {
                    console.log('client nodejs: add(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: add: catch: ', err)
                })
            wo.minu(ps)
                .then(function(r) {
                    console.log('client nodejs: minu(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: minu: catch: ', err)
                })
        }

        let i = 100
        setInterval(function() {
            i += 1
            core({
                p1: i,
                p2: 10,
            })
        }, 1000)

    })
    .catch(function(err) {
        console.log('client nodejs: catch', err)
    })
```

### In a browser(UMD module):
> **Note:** `si-client` does't depend on any package in browser.

[Optional] Add script with nomodule for IE11.
```alias
<script nomodule src="https://cdn.jsdelivr.net/npm/@babel/polyfill/dist/polyfill.min.js"></script>
```
[Necessary] Add script for si-client.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-comor-socketio@1.0.3/dist/si-client.umd.js"></script>
```
#### Example for `si-client`:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-comor-socketio/blob/master/web.html)]
```alias
//opt
let opt = {
    url: 'http://localhost:8080',
    token: '*',
    open: function() {
        console.log('client web: open')
    },
    close: function() {
        console.log('client web: close')
    },
    error: function(err) {
        console.log('client web: error:', err)
    },
    reconn: function() {
        console.log('client web: reconn')
    },
}

//SiClient
let SiClient = window['si-client']
new SiClient(opt)
    .then(function(wo) {
        console.log('client web: funcs: ', wo)
        
        function core(ps) {
            wo.group.plus(ps)
                .then(function(r) {
                    console.log('client web: plus(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client web: plus: catch: ', err)
                })
            wo.group.div(ps)
                .then(function(r) {
                    console.log('client web: div(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client web: div: catch: ', err)
                })
            wo.add(ps)
                .then(function(r) {
                    console.log('client web: add('+JSON.stringify(ps)+')='+r)
                })
                .catch(function(err) {
                    console.log('client web: add: catch: ', err)
                })
            wo.minu(ps)
                .then(function(r) {
                    console.log('client web: minu('+JSON.stringify(ps)+')='+r)
                })
                .catch(function(err) {
                    console.log('client web: minu: catch: ', err)
                })
        }

        let i = 100
        setInterval(function() {
            i += 1
            core({
                p1: i,
                p2: 10,
            })
        }, 1000)

    })
    .catch(function(err) {
        console.log('client web: catch: ', err)
    })
```