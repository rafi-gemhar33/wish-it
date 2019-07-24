const express = require('express');
const router = express.Router();



const userController = require('../../controllers/userController');
const auth = require('../auth');
const User = require('../../models/user')


router.post('/user', (req, res, next) => {  
	User.create(req.body.user, (err, user)=>{
		if(err) return res.status(500).json(err);
		res.status(201).json({user: user.toAuthJSON()});
    });
});

router.post('/login', function(req, res, next){
  const {email, password} = req.body.user;
  if(!email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  User.findOne({email}, (function(err, user){

    if(err) return res.status(500).json(err);
    if(!user || !user.validatePassword(password)){
      return res.status(422).json({errors: {'email or password': 'is invalid'}})
    } else {
      return res.status(200).json({user: user.toAuthJSON()});
    }
  }));
})

router.get('/user', auth.verifyToken, function(req, res, next){
  User.findById(req.user.id, (err, user) => {
    if(err) return res.status(500).json(err);
    return res.json({user: user.toAuthJSON()});
  })
});

router.put('/user', auth.verifyToken, function(req, res, next){

  User.findByIdAndUpdate(req.user.id, req.body.user, {new: true}, (err, updatedUser) => {
    if(err) return res.status(500).json(err);
    return res.json({user: updatedUser.toAuthJSON()});
  });
});

module.exports = router;
