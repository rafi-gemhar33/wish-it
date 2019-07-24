const express = require('express');
const router = express.Router();

const eventController = require('../../controllers/eventController');
const auth = require('../auth');
const Event = require('../../models/event');
const Address = require('../../models/address');

// Post /api/address/:slug
router.post('/:event', auth.verifyToken, (req, res, next) => { 
    Event.findOne({slug: req.params.event}, (err, event) => {
        
        if(err) return res.status(500).json(err);
        req.body.address.user = req.user;
        Address.create(req.body.address, (err, address) => {
            if(err) return res.status(500).json(err);
            event.address = address;
            event.save()
            .then(function(){
                return res.json({address: address.toAddressJSON()});
              }).catch(next);
        })
    })
    
})

// Add Address to an Event
// GET /api/address
router.get("/", auth.verifyToken, (req, res) => {
    Address.find({user: req.user.id}, (err, addresses) => {
        if(err) return res.status(500).json(err);
        return res.json({addresses})
    })
});

router.get("/:id", auth.verifyToken, (req, res) => {
    Address.findById(req.params.id, (err, address) => {
        if(err) return res.status(500).json(err);
        return res.json({address})
    })
});

router.put("/:id", auth.verifyToken, (req, res) => {
    Address.findByIdAndUpdate(req.params.id, req.body.address, {new: true}, (err, address) => {
        if(err) return res.status(500).json(err);
        return res.json({address})
    })
});

router.delete("/:id", auth.verifyToken, (req, res) => {
    Address.findByIdAndDelete(req.params.id, (err, address) => {
        if(err) return res.status(500).json(err);
        return res.json({removedAddress: address})
    })
});

module.exports = router;