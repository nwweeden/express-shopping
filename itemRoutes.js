const express = require('express');
const { NotFoundError } = require("./expressError");

const db = require('./fakeDb');
const { response } = require('./app');

const router = new express.Router();


router.get('/', function(req, res, next) {
    try {
        if (!db) throw new NotFoundError();
        return res.json(db)
    } catch (err) {
        return next(err)
    }
})

router.post('/', function(req, res, next) {
    try {
        if(!req.body.name || !req.body.price) throw new NotFoundError()
        let name = req.body.name
        let price = req.body.price
        let newItem = ({name, price})
        db.items.push(newItem)
        return res.json({'added': newItem}, 201)
    } catch (err) {
        return next(err)
    }
})

router.get('/:name', function(req, res, next) {
    try {
        for (let item of db.items){
            if (item.name === req.params.name){
                return res.json(item)
            }
        }
        throw new NotFoundError()
    } catch (err) {
        return next(err)
    }
})

router.patch('/:name', function(req, res, next) {
    try {
        for (let item of db.items){
            if (item.name === req.params.name){
                item.name = req.body.name;
                item.price = req.body.price;
                return res.json({"updated": item});
            }
        }
        throw new NotFoundError()
    } catch(err) {
        return next(err);
    }
})

router.delete('/:name', function(req, res, next) {
    try {
        for (let item of db.items){
            if (item.name === req.params.name){
                db.items.splice(db.items.indexOf(item), 1);
                return res.json({"message": "deleted"});
            }
        }
        throw new NotFoundError()
    } catch(err) {
        return next(err);
    }
})

// make a function for finding item in list

module.exports = router;