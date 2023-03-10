const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            max:500,
        },
        img:{ 
            type:String
        },
        likes:{
            type:Array,
            default:[]
        },

    },
{ timestamps: true }   //to get timestamps when new user is created or updated..
);

module.exports = mongoose.model("Post", PostSchema); //Users is the name of our model
