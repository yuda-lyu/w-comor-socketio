import SocketIOClient from 'socket.io-client'
import EventEmitter from 'wolfy87-eventemitter'
import get from 'lodash/get'
import set from 'lodash/set'
import genPm from 'wsemi/src/genPm.mjs'
import genID from 'wsemi/src/genID.mjs'
import j2o from 'wsemi/src/j2o.mjs'
import isfun from 'wsemi/src/isfun.mjs'


/**
 * 建立SocketIO使用者(Node.js與Browser)端物件
 *
 * @param {Object} opt 輸入設定參數物件
 * @param {String} [opt.url='http://localhost:8080'] 輸入SocketIO伺服器網址，預設為'http://localhost:8080'
 * @param {String} [opt.token='*'] 輸入使用者認證用token，預設為'*'
 * @param {Object} [opt.ioSettings={}] 輸入SocketIO初始化設定物件，預設為{}
 * @param {Function} opt.open 輸入監聽open函數
 * @param {Function} opt.close 輸入監聽close函數
 * @param {Function} opt.error 輸入監聽error函數
 * @param {Function} opt.reconn 輸入監聽reconn函數
 * @returns {Promise} 回傳Promise，resolve為映射伺服器端可用函數之物件，各函數輸入皆為單一物件，各函數回傳皆為Promise，用resolve與reject處理回傳結果
 * @example
 *
 * import SiClient from 'w-comor-socketio/dist/si-client.umd.js'
 *
 * //opt
 * let opt = {
 *     url: 'http://localhost:8080',
 *     token: '*',
 *     open: function() {
 *         console.log('client nodejs: open')
 *     },
 *     close: function() {
 *         console.log('client nodejs: close')
 *     },
 *     error: function(err) {
 *         console.log('client nodejs: error:', err)
 *     },
 *     reconn: function() {
 *         console.log('client nodejs: reconn')
 *     },
 * }
 *
 * //SiClient
 * new SiClient(opt)
 *     .then(function(wo) {
 *         console.log('client: funcs: ', wo)
 *
 *         function core(ps) {
 *             wo.group.plus(ps)
 *                 .then(function(r) {
 *                     console.log('client: plus(' + JSON.stringify(ps) + ')=' + r)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: plus: catch: ', err)
 *                 })
 *             wo.group.div(ps)
 *                 .then(function(r) {
 *                     console.log('client: div(' + JSON.stringify(ps) + ')=' + r)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: div: catch: ', err)
 *                 })
 *             wo.add(ps)
 *                 .then(function(r) {
 *                     console.log(`client: add(${JSON.stringify(ps)})=${r}`)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: add: catch: ', err)
 *                 })
 *             wo.minu(ps)
 *                 .then(function(r) {
 *                     console.log(`client: minu(${JSON.stringify(ps)})=${r}`)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: minu: catch: ', err)
 *                 })
 *         }
 *
 *         let i = 100
 *         setInterval(function() {
 *             i += 1
 *             core({
 *                 p1: i,
 *                 p2: 10,
 *             })
 *         }, 1000)
 *
 *     })
 *     .catch(function(err) {
 *         console.log('client: catch', err)
 *     })
 *
 */
function SiClient(opt) {
    let pm = genPm()
    let ioc = null //socket.io
    let wo = {} //回傳操作物件


    //ev
    let ev = new EventEmitter()


    function core() {


        //default
        if (!opt.url) {
            opt.url = 'http://localhost:8080'
        }
        if (!opt.token) {
            opt.token = '*'
        }
        if (!opt.ioSettings) {
            opt.ioSettings = {}
        }


        //socket.io-client
        try {
            ioc = new SocketIOClient(opt.url, opt.ioSettings)
        }
        catch (err) {
            console.log('create SocketIOClient error', err)
            return null
        }


        //execFunction
        function execFunction(func, input = null) {
            let pmm = genPm()

            //_id
            let _id = genID()

            //msg
            let msg = {
                token: opt.token,
                _id: _id,
                func: func,
                input: input,
            }

            //send
            try {
                ioc.send(JSON.stringify(msg), function(err) {
                    if (err) {
                        if (isfun(opt.error)) {
                            opt.error(err)
                        }
                    }
                })
            }
            catch (err) {
                if (isfun(opt.error)) {
                    opt.error(err)
                }
            }

            //等待結果回傳
            ev.on(_id, function (output) {

                //resolve
                pmm.resolve(output)

                //removeAllListeners
                ev.removeAllListeners(_id)

            })

            return pmm
        }


        //connect
        function fConnect() {
            if (isfun(opt.open)) {
                opt.open()
            }
            execFunction('getFuncs', null)
        }
        ioc.on('connect', fConnect)


        //fMessage
        function fMessage(message) {

            //data
            let data = j2o(message)

            //get sys funcs
            if (get(data, 'output.sys') === 'sys' && get(data, 'output.funcs')) {

                //funcs
                let funcs = data['output']['funcs']

                //clear wo
                wo = {}

                //bind funcs
                for (let i = 0; i < funcs.length; i++) {

                    //func
                    let func = funcs[i]

                    //add func
                    let f = function(input) {
                        return execFunction(func, input)
                    }
                    set(wo, func, f)

                }

                //resolve
                pm.resolve(wo)

            }

            //get result
            if (get(data, '_id') && get(data, 'output')) {

                //_id
                let _id = get(data, '_id')

                //output
                let output = get(data, 'output')

                //emit
                ev.emit(_id, output)

            }

        }
        ioc.on('message', fMessage)


        //fClose
        function fClose() {
            if (isfun(opt.close)) {
                opt.close()
            }
        }
        ioc.on('disconnect', fClose)


        //fReconnect
        function fReconnect() {
            if (isfun(opt.reconn)) {
                opt.reconn()
            }
        }
        ioc.on('reconnect', fReconnect)


        //fError
        function fError(err) {
            if (isfun(opt.error)) {
                opt.error(err)
            }
        }
        ioc.on('error', fError)


    }


    //core
    core()


    return pm
}


export default SiClient
