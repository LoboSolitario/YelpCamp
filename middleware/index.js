var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObject ={};

middlewareObject.isLoggedIn = function(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that.");
    res.redirect("/login");
}

middlewareObject.isSameUserCampground = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id , function(err,foundCamp){
            if(err){
                req.flash("error" , "Campground not found.")
                res.redirect("back");
            }
            else
            {
                if(foundCamp.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash("error" , "You don't have the permission to do that.");
                res.redirect("back");
            }
        })  
    }
    else
    {
        req.flash("error","You need to be logged in to do that.");
        res.redirect("/login");
    }
    
}

middlewareObject.isSameUserComment = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            {
                console.log(err);
            }
            else
            {
                if(foundComment.author.id.equals(req.user.id)){
                    return next();
                }
                else{
                    console.log("you are not allowed");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("/login");
    }
}
module.exports = middlewareObject;