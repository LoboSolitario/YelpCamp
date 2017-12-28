var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var middleware = require("../middleware")


router.get("/", function(req, res) {
    Campground.find({}, function(err, allCamps) {
        if (err)
            console.log(err);
        else
            res.render("campground/index", { campgrounds: allCamps });
    });

});

router.post("/",middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    Campground.create({
        name: name,
        image: image,
        description: desc
    }, function(err, newCamp) {
        if (err)
            console.log("there is an error");
        else{
            newCamp.author.id = req.user._id;
            newCamp.author.name = req.user.username;
            newCamp.save();
            console.log(newCamp);   
        }
    });
    res.redirect("/campground");
});

router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comment").exec(function(err, camp) {
        if (err)
            console.log(err);
        else
            res.render("campground/show", { selectedCamp: camp });
    });
});

router.get("/:id/edit",middleware.isSameUserCampground, function(req ,res){
    Campground.findById(req.params.id , function(err,foundCamp){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/edit",{camp:foundCamp}); 
        }
    })
    
});

router.put("/:id" ,middleware.isSameUserCampground, function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.newCamp,function(err,updatedCamp){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect("/campground/"+updatedCamp._id);
        }
    }) ;
});

router.delete("/:id",middleware.isSameUserCampground, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campground");
        }
        else{
            req.flash("success" , "Campground Deleted");
            res.redirect("/campground");
        }
    })
})


module.exports = router;