'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = ((req, res, next) => {
    Product.find({ active: true }, 'title slug price')
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(error => {
            res.status(400).send({
                data: {
                    status: 'error',
                    data: error.message,
                }
            })
        })
})

exports.getBySlug = ((req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title slug price tags')
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(error => {
            res.status(400).send({
                data: {
                    status: 'error',
                    data: error.message,
                }
            })
        })
})

exports.getById = ((req, res, next) => {
    Product.findById(req.params.id, 'title slug price tags')
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(error => {
            res.status(400).send({
                data: {
                    status: 'error',
                    data: error.message,
                }
            })
        })
})

exports.getByTag = ((req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title slug price tags')
        .then(data => {
            res.status(200).send({
                data: data
            })
        })
        .catch(error => {
            res.status(400).send({
                data: {
                    status: 'error',
                    data: error.message,
                }
            })
        })
})

exports.post = (req, res, next) => {
    let product = new Product()
    product.title = req.body.title
    product.slug = handleSlug(req.body.slug)
    product.description = req.body.description
    product.price = req.body.price
    product.tags = req.body.tags
    product.save()
        .then(data => {
            res.status(201).send({
                data: data
            })
        })
        .catch(error => {
            res.status(400).send({
                data: {
                    status: 'error',
                    data: error.message,
                }
            })
        })

}

exports.put = (req, res, next) => {
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    })
    .then(data => {
        res.status(204).send({
        })
    })
    .catch(error => {
        res.status(400).send({
            data: {
                status: 'error',
                data: error.message,
            }
        })
    })
}

exports.delete = (req, res, next) => {
    Product
    .findByIdAndDelete(req.params.id)
    .then(data => {
        res.status(204).send({
        })
    })
    .catch(error => {
        res.status(400).send({
            data: {
                status: 'error',
                data: error.message,
            }
        })
    })
}

function handleSlug(slug){
    let text = slug.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/[- ]+/g, "-")
    let date = Date.now()
    return `${text}${date}`
}