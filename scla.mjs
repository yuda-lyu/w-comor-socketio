import WComorSocketioClient from './src/WComorSocketioClient.mjs'
//import WComorSocketioClient from './dist/w-comor-socketio-client.umd.js'

let opt = {
    url: 'http://localhost:8080',
    token: '*',
    open: function() {
        console.log('client nodejs[port:8080]: open')
    },
    close: function() {
        console.log('client nodejs[port:8080]: close')
    },
    error: function(err) {
        console.log('client nodejs[port:8080]: error:', err)
    },
    reconn: function() {
        console.log('client nodejs[port:8080]: reconn')
    },
}

new WComorSocketioClient(opt)
    .then(function(wo) {
        console.log('client nodejs[port:8080]: funcs: ', wo)

        function core(ps) {
            wo.group.plus(ps)
                .then(function(r) {
                    console.log('client nodejs[port:8080]: plus(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs[port:8080]: plus: catch: ', err)
                })
            wo.group.div(ps)
                .then(function(r) {
                    console.log('client nodejs[port:8080]: div(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs[port:8080]: div: catch: ', err)
                })
            wo.add(ps)
                .then(function(r) {
                    console.log('client nodejs[port:8080]: add(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs[port:8080]: add: catch: ', err)
                })
            wo.minu(ps)
                .then(function(r) {
                    console.log('client nodejs[port:8080]: minu(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs[port:8080]: minu: catch: ', err)
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
        console.log('client nodejs[port:8080]: catch: ', err)
    })

//node --experimental-modules --es-module-specifier-resolution=node scla.mjs
