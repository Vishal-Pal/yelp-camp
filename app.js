var express = require('express');
var app =express(),
    flash= require('connect-flash');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Vishal:tarushexp6@yelpcamp0-miwt1.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
var passport = require('passport'),
    LocalStrategy=require('passport-local'),
    User = require('./models/users'),
    passportLocalMongoose = require('passport-local-mongoose');

var campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
app.set("view engine", "ejs");


app.use(flash());
app.use(require("express-session")({
    secret: "Vishal Pal is an expert in Web Development",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   next();
});

//The Routes
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp Server has started!");
});