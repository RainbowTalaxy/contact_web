const express = require('express')
const bodyParser = require('body-parser')
const contact_db = require('./src/contact')

var app = express()
var port = 8077

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('origin'))
    next()
})

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('resources'))

const badStatus = {
    code: 400,
    msg: "请求失败"
}

const goodStatus = {
    code: 200,
    msg: "请求成功"
}

app.get('/contact/info', (_, res) => {
    contact_db.findAll((error, result) => {
        if (error) {
            res.send({
                status: badStatus
            })
        } else {
            res.send({
                status: goodStatus,
                list: result
            })
        }
    })
})

app.post('/contact/add', (req, res) => {
    if (req.body.i_name && req.body.i_addr && req.body.i_tele) {
        const parmas = {
            i_name: req.body.i_name,
            i_addr: req.body.i_addr,
            i_tele: req.body.i_tele
        }
        contact_db.add(parmas, (error, _) => {
            if (error) {
                res.send({
                    status: badStatus
                })
            } else {
                res.send({
                    status: goodStatus
                })
            }
        })
    } else {
        res.send({
            status: badStatus
        })
    }
})

app.put('/contact/update', (req, res) => {
    if (req.body.i_name && req.body.i_addr && req.body.i_tele) {
        const parmas = {
            i_name: req.body.i_name,
            i_addr: req.body.i_addr,
            i_tele: req.body.i_tele
        }
        contact_db.change(parmas, req.body.i_id, (error, _) => {
            if (error) {
                res.send({
                    status: badStatus
                })
            } else {
                res.send({
                    status: goodStatus
                })
            }
        })
    } else {
        res.send({
            status: badStatus
        })
    }
})

app.delete('/contact/remove', (req, res) => {
    if (req.body.i_id) {
        contact_db.removeById(req.body.i_id, (error, _) => {
            if (error) {
                res.send({
                    status: badStatus
                })
            } else {
                res.send({
                    status: goodStatus
                })
            }
        })
    } else {
        res.send({
            status: badStatus
        })
    }
})

app.listen(port, () => {
    console.log('listening on port ' + port + '...')
})