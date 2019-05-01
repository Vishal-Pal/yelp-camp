var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/users");
router.get("/", function(req, res){
    res.render("landings");
});

router.get("/register", function(req, res){
   res.render("register"); 
});
router.get("/login",function(req, res){
   req.flash("error", "You must be Logged in to do that");
   res.render("login"); 
});
router.post("/register", function(req, res){
    User.register(new User({username : req.body.username}), req.body.password, function(err, user){
       if(err){
        //   console.log(err.message);
           req.flash("error", err.message);
           res.redirect("/register");
       } 
       passport.authenticate("local")(req,res, function(){
          req.flash("success", "Welcome "+ req.body.username);
          res.redirect("/campgrounds"); 
       });
    });
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
        badRequestMessage : 'Missing username or password.',
    failureFlash: true
}), function(req, res){
    req.flash("success", "Welcome back, "+req.body.username+"!");
    res.redirect("/campgrounds");
});

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You have been logged out!");
   res.redirect("/");
});

function isLoggedIn(req, res , next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;