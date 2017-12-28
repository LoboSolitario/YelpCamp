var express = require("express");
var router = express.Router({mergeParams:true});
var  Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


router.get("/new",middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err)
            console.log(err);
        else
            res.render("comment/new", { commentCamp: camp });
    });
});

router.post("/",middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(req.params.id);
           res.redirect("/campground");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comment.push(comment);
               campground.save();
               res.redirect('/campground/' + campground._id);
           }
        });
       }
   });
});



router.get("/:comment_id/edit",middleware.isSameUserComment ,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("comment/edit",{campground_id : req.params.id, comment : foundComment});
        }
    })
});


router.put("/:comment_id",middleware.isSameUserComment ,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedCamp){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    }) 
});

router.delete("/:comment_id", function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect("/campground/"+req.params.id);
        }
    })
})


module.exports = router;
