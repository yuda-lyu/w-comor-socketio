import WComorSocketioServer from './src/WComorSocketioServer.mjs'
//import WComorSocketioServer from './dist/w-comor-socketio-server.umd.js'

function random(min, max) {
    return Math.floor(Math.random() * max) + min
}

function getOpt(port) {
    return {
        port,
        authenticate: function(token) {
            //使用token驗證使用者身份
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(true)
                }, 1000)
            })
        },
        filterFuncs: function(token, funcs) {
            //使用token驗證使用者身份與過濾可用funcs
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
}


let opt = getOpt(8080)
new WComorSocketioServer(opt)

let opt2 = getOpt(8081)
new WComorSocketioServer(opt2)

//node --experimental-modules --es-module-specifier-resolution=node srv.mjs
