'use strict'

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

//cria app
const app = express()

//conexão com banco de dados 
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)

//models - se carregar depois das rotas causa erro.
const Product = require('./models/product-model')

//rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app 