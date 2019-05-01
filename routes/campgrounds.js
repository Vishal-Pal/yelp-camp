var express = require('express');
var router = express.Router();
var Campground = require("../models/campgrounds");

router.get("/", function(req, res){
    
      Campground.find({},function(err, campgrounds){
          if(err){
              console.log("Error");
          }else{
              res.render("campgrounds", {campgrounds:campgrounds});
          }
      })
});

router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.imageUrl;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username : req.user.username
    };
    Campground.create({
        name: name,
        image: image,
        description : desc,
        author : author
    });
    res.redirect("/campgrounds");
});

router.get("/new",isLoggedIn, function(req, res){
    res.render("new");    
});

router.get("/:id",function(req, res){
   Campground.findById(req.params.id, function(err, found){
       if(err){
           console.log("Error!");
       }else{
           res.render("show",{campG: found});
       }
   });
});

function isLoggedIn(req, res , next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that!");
    res.redirect("/login");
}

module.exports =router;