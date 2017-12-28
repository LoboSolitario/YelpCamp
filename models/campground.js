var mongoose  =require("mongoose");

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comment:[   
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "Comment"
                }
            ],
    author:{
            id: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref : "User"
                },
            name : String
    }
});

module.exports = mongoose.model("Campground", campSchema);