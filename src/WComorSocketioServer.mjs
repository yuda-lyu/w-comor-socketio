import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert' //提供靜態檔案
import { Server } from 'socket.io'
import keys from 'lodash-es/keys.js'
import get from 'lodash-es/get.js'
import genPm from 'wsemi/src/genPm.mjs'
import haskey from 'wsemi/src/haskey.mjs'
import j2o from 'wsemi/src/j2o.mjs'
import isfun from 'wsemi/src/isfun.mjs'
import ispint from 'wsemi/src/ispint.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cint from 'wsemi/src/cint.mjs'
import arrHas from 'wsemi/src/arrHas.mjs'


let SocketIO = Server


/**
 * 建立socket.io伺服器
 *
 * @param {Object} opt 輸入設定參數物件
 * @param {Object} [opt.serverHapi={}] 輸入hapi伺服器物件，若提供，本服務將自動加入api至route。使用外部hapi伺服器時，需開啟跨域功能，或是使用nginx反向代理轉入api請求
 * @param {Integer} [opt.port=8080] 輸入hapi與socket.io伺服器所在port，為hapi與socket.io共用，預設8080
 * @param {String} [opt.pathPolling=undefined] 輸入socket.io伺服器無法使用WebSocket連線自動降級成為輪詢(polling)所在子目錄字串，預設undefined，代表使用'/socket.io'
 * @param {Function} opt.authenticate 輸入使用者身份認證函數，供伺服器端驗證之用，函數會傳入使用者端連線之token參數，回傳為Promise，resolve(true)為驗證通過，resolve(false)為驗證不通過
 * @param {Object} [opt.funcs={}] 輸入伺服器端供使用者端呼叫之函數物件，各key為函數名稱，對應value為函數本體。各函數之輸入需為單一物件，而各函數回傳皆為Promise，可通過resolve與reject回傳結果，預設{}
 * @param {Array} [opt.routes=[]] 輸入伺服器額外掛載routes陣列，預設[]
 * @example
 *
 * import WComorSocketioServer from 'w-comor-socketio/dist/w-comor-socketio-server.umd.js'
 *
 * function random(min, max) {
 *     return Math.floor(Math.random() * max) + min
 * }
 *
 * let opt = {
 *     port: 8080,
 *     authenticate: function(token) {
 *         //使用token驗證使用者身份
 *         return new Promise(function(resolve, reject) {
 *             setTimeout(function() {
 *                 resolve(true)
 *             }, 1000)
 *         })
 *     },
 *     filterFuncs: function(token, funcs) {
 *         //使用token驗證使用者身份與過濾可用funcs
 *         return new Promise(function(resolve, reject) {
 *             funcs = funcs.filter(function(v) {
 *                 return v.indexOf('Hide') < 0
 *             })
 *             resolve(funcs)
 *         })
 *     },
 *     onClientChange: function(clients, opt) {
 *         console.log(`Server[port:${opt.port}] now clients: ${clients.length}`)
 *     },
 *     funcs: {
 *         'group.plus': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 * p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'group.div': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 / p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'add': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 + p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'addHide': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 + p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'minu': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 - p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *     },
 * }
 *
 * new WComorSocketioServer(opt)
 *
 */
function WComorSocketioServer(opt) {


    //port
    let port = get(opt, 'port')
    if (!ispint(port)) {
        port = 8080
    }
    port = cint(port)


    //pathPolling
    let pathPolling = get(opt, 'pathPolling')


    //funcs
    let funcs = []
    if (haskey(opt, 'funcs')) {
        funcs = keys(opt['funcs'])
    }


    //authenticate
    function authenticate(token) {
        let pm = genPm()
        if (isfun(opt.authenticate)) {
            opt.authenticate(token)
                .then(function(vd) {
                    pm.resolve(vd)
                })
        }
        else {
            pm.resolve(true)
        }
        return pm
    }


    //server
    let server
    if (opt.serverHapi) {

        //use serverHapi
        server = opt.serverHapi

    }
    else {

        //create server
        server = Hapi.server({
            port: opt.port,
            //host: 'localhost',
            routes: {
                cors: true
            },
        })

    }


    //io
    let io = null
    let ioOpt = {}
    if (isestr(pathPolling)) {
        ioOpt = { path: pathPolling }
    }
    try {
        io = new SocketIO(server.listener, ioOpt)
    }
    catch (err) {
        console.log(`create SocketIO catch:`, err)
        return null
    }


    //connect
    let clients = []
    io.on('connect', function(client) {
        //console.log('connect', client.id)


        //push
        clients.push(client.id)
        if (isfun(opt.onClientChange)) {
            opt.onClientChange(clients, opt)
        }


        //execFunction
        async function execFunction(data) {
            //console.log('execFunction', client.id, data)

            //token
            let token = get(data, 'token', '')

            //vd
            let vd = await authenticate(token)

            //check
            if (vd) {

                //func
                let func = get(data, 'func', '')

                //input
                let input = get(data, 'input')

                //getFuncs
                if (func === 'getFuncs') {

                    if (isfun(opt.filterFuncs)) {
                        funcs = await opt.filterFuncs(token, funcs)
                    }

                    //add output
                    data['output'] = { sys: 'sys', funcs }

                }
                //call
                else if (arrHas(funcs, func)) {

                    //call func in opt.funcs
                    let output = await opt['funcs'][func](input)

                    //add output
                    data['output'] = output

                }
                else {

                    //add output
                    data['output'] = { err: `can not find: ${func}` }

                }

            }
            else {

                //add output
                data['output'] = { err: `can not authenticate token: ${token}` }

            }

            //delete input, 因input可能很大故回傳數據不包含原input
            delete data['input']

            //send
            try {
                client.send(JSON.stringify(data), function(err) {
                    if (err) {
                        console.log(`Server: send output error:`, err)
                    }
                })
            }
            catch (err) {
                console.log(`Server: send output catch:`, err)
            }

        }


        //message
        client.on('message', function(msg) {
            //console.log('message', client.id, msg)

            //data
            let data = j2o(msg)

            //execFunction
            execFunction(data)

        })


        //disconnect, close
        client.on('disconnect', function(msg) {
            //console.log('disconnect', client.id, msg)

            //刪除client
            clients = clients.filter(function(id) {
                return id !== client.id
            })
            if (isfun(opt.onClientChange)) {
                opt.onClientChange(clients, opt)
            }

        })


    })


    async function createServer() {

        if (!opt.serverHapi) {

            //register inert
            await server.register(Inert)

            //api
            let api = [
                // {
                //     method: 'GET',
                //     path: '/{file*}',
                //     handler: {
                //         directory: {
                //             path: './'
                //         },
                //     },
                // },
                //預設僅提供測試之3檔案
                {
                    method: 'GET',
                    path: '/web.html',
                    handler: {
                        file: {
                            path: './web.html'
                        },
                    },
                },
                {
                    method: 'GET',
                    path: '/dist/w-comor-socketio-client.umd.js',
                    handler: {
                        file: {
                            path: './dist/w-comor-socketio-client.umd.js'
                        },
                    },
                },
                {
                    method: 'GET',
                    path: '/dist/w-comor-socketio-client.umd.js.map',
                    handler: {
                        file: {
                            path: './dist/w-comor-socketio-client.umd.js.map'
                        },
                    },
                },
            ]

            //route
            server.route(api)

        }

        //start
        await server.start()

        console.log(`Server running at: ${server.info.uri}`)

    }
    createServer()


}


export default WComorSocketioServer
