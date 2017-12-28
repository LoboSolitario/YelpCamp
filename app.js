var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    seedDB = require("./seed");


var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
     
//MONGOOSE CONFIG


mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
mongoose.Promise = global.Promise;



//AUTHENTICATION CONFIG


app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"This is awesome",
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(function(req,res,next){
    res.locals.currentUser = req.user;//for sending req.user to all the routes
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); 
});
//ROUTES


app.use(indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comment",commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started");
});
