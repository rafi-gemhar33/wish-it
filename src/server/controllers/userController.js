const User = require('../models/user');

exports.createUser = (req, res, next)=> {
    User.create(req.body.user, (err, createdUser)=> {
      if(err) return next(err);
    //   res.redirect('/users/login')
    res.json(createdUser)
    });
}