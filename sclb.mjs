import SiClient from './src/SiClient.mjs'
//import SiClient from './dist/si-client.umd.js'

let opt = {
    url: 'http://localhost:8081',
    token: '*',
    open: function() {
        console.log('client nodejs[port:8081]: open')
    },
    close: function() {
        console.log('client nodejs[port:8081]: close')
    },
    error: function(err) {
        console.log('client nodejs[port:8081]: error:', err)
    },
    reconn: function() {
        console.log('client nodejs[port:8081]: reconn')
    },
}

new SiClient(opt)
    .then(function(wo) {
        console.log('client nodejs[port:8081]: funcs: ', wo)

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
                    console.log('client nodejs[port:8081]: add(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs[port:8081]: add: catch: ', err)
                })
            wo.minu(ps)
                .then(function(r) {
                    console.log('client nodejs[port:8081]: minu(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs[port:8081]: minu: catch: ', err)
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
        console.log('client nodejs[port:8081]: catch: ', err)
    })
