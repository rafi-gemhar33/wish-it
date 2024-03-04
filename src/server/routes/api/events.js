const express = require('express');
const router = express.Router();

const eventController = require('../../controllers/eventController');
const auth = require('../auth');
const User = require('../../models/user');
const Event = require('../../models/event');
const Gift = require('../../models/gift');
const Address = require('../../models/address');
// const giftsRouter = require('./gifts');

// router.use('/:article/gifts', giftsRouter);

router.get('/', (req, res) =>{
    //All the Events
    Event.find({})
    .populate('user', '-password')
    .exec((err, eventList) => {
        if(err) return res.status(500).json(err);
        if(eventList){
            return res.status(200).json({eventList});
        } else {
            return res.status(401).json({error: 'Email or password do not match'});
        }
		
    })
}) 

router.get('/user', auth.verifyToken, (req, res, next) =>{
    //Get all events of one user
    Event.find({user: req.user.id})
    .populate('user', '-password')
    .exec((err, eventList) => {
        if(err) return res.status(500).json(err);
        if(eventList){
            return res.status(200).json({eventList});
        } else {
            return res.status(401).json({error: 'Cannot find user'});
        }
    })

})

router.get('/:event', (req, res) =>{
    //Only one event
    Event.findOne({eventName: req.params.event})
    .populate('user', '-password')
    .exec((err, event) => {
        if(err) return res.status(500).json(err);
        if(event){
            return res.status(200).json({event});
        } else {
            return res.status(401).json({error: 'Cannot find event name'});
        }
		
    })
}) 

router.post('/', auth.verifyToken, (req, res, next) =>{
    //Post one event
    console.log("bubba luba dud dub");
    
    Address.create(req.body.eventAddress.address, (err, address) => {
        if(err) return res.status(500).json(err);        
        let event = req.body.event;
        event.user = req.user;
        event.address = address;
        Event.create(event, (err, newEvent) => {
          if(err) return res.status(500).json(err);
          if(newEvent){
              return res.json({event: newEvent.toJSONFor()});
          } else {
            return res.json({event: 'Event name is not available'});
          }

        })
    })

});

router.put('/:event', auth.verifyToken, (req, res) =>{
    //Post one event
    Event.findOneAndUpdate({slug: req.params.event}, req.body.event, {new: true})
    .populate('user', '-password')
    .exec((err, event) => {
        if(err) return res.status(500).json(err);
        if(event){
            return res.status(200).json({event});
        } else {
            return res.status(401).json({error: 'Event Slugger is a messy one to update'});
        }
		
    })
})

router.delete('/:event', auth.verifyToken, (req, res) =>{
    //Post one event
    Event.findOneAndDelete({slug: req.params.event})
    .populate('user', '-password')
    .exec((err, event) => {
        if(err) return res.status(500).json(err);
        if(event){
            return res.status(200).json({event});
        } else {
            return res.status(401).json({error: 'Event Slugger is a messy one to Delete'});
        }
		
    })
})

router.get('/:event/gifts', (req, res) => {
    Event.findOne({slug: req.params.event})
    .populate('gifts')
    .exec((err, event) => {
        if(err) return res.status(500).json(err);
        if(event){
            return res.status(200).json({gifts: event.gifts});
        } else {
            return res.status(401).json({error: 'Event Slugger is a messy one to get gifts'});
        }
		
    })
})
router.patch('/:event/gifts/:id',(req, res) => {
    Gift.findByIdAndUpdate(req.params.id, req.body.gift, { new: true }, (err, gift) => {
        if(err) return res.status(500).json(err);        
        return res.json(gift);
    })
})


router.post('/:event/gifts', auth.verifyToken, (req, res, next) => {
    Event.findOne({slug: req.params.event}, (err, event) => {
        if(err) return res.status(500).json(err);
        req.body.gift.event = event;
        Gift.create(req.body.gift, (err, gift) => {
            if(err) return res.status(500).json(err);
            console.log(gift.id);
            
            event.gifts.push(gift.id)

            // console.log(event);
            event.save()
            .then(function(event){
                event.user = req.user;
                return res.json(gift);
              }).catch(next);
        })

    })
    
})
router.put('/:event/gifts/:id',(req, res) => {
    Gift.findByIdAndUpdate(req.params.id, req.body.gift, { new: true }, (err, gift) => {
        if(err) return res.status(500).json(err);        
        return res.json(gift);
    })

})
router.delete('/:event/gifts/:id', auth.verifyToken,(req, res) => {
    Event.findOneAndUpdate({slug: req.params.event}, {$pull: {gifts: req.params.id}},
        {safe: true, upsert: true}, (err, event) => {
            console.log(event);
            
            Gift.findOneAndDelete(req.params.id, (err, gift) => {
                if(err) return res.status(500).json(err);        
                return res.json(gift);
            })
    })

})


module.exports = router;