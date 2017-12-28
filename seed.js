var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment");
var data = [{
                name: "moonkiss",
                image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. "
            }, {
                name: "moonkiss",
                image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. "
            }, {
                name: "moonkiss",
                image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. "
            }
];
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        else
        {   
            // data.forEach(function(camp){
            //     Campground.create(camp , function(err,campGround){
            //         if(err){
            //             console.log(err);
            //         }
            //         else{
            //             console.log("new campground added");
            //             Comment.create({
            //                 author:"Ramakant",
            //                 text:"This is spartan"
            //             },function(err,comments){
            //                 if(err){
            //                     console.log(err);
            //                 }
            //                 else
            //                 {   
            //                     console.log("new comment created");
            //                     campGround.comment.push(comments);
            //                     campGround.save();
            //                     console.log("new campground with comment created");
            //                 }
            //             });
            //         }
            //     });
            // });
        }
    });
};
module.exports = seedDB;