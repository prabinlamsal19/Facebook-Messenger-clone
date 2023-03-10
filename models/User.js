const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ 
    username:{ 
        type: String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{ 
        type: String,
        require: true,
        max:50,
        unique:true
    },
    password:{ 
        type:String , 
        required:true,
        min:6
    },
    profilePicture:{ 
        type:String,
        default:" "
    },
    coverPicture:{ 
        type:String,
        default:" "
    },
    followers:{ 
        type: Array,
        default:[]   //will be the array containing follower userID
    },
    following:{ 
        type: Array,
        default:[]   //will be the array containing follower userID
    },
    isAdmin:{ 
        type:Boolean,
        default:false,
    },
    desc:{ 
        type:String,
        max:50,
    },
    city:{ 
        type:String,
        max:50
    },
    from:{ 
        type:String,
        max:50
    },
    relationship:{ 
        type:Number,
        enum: [1,2,3]
    }
},
{timestamps:true}   //to get timestamps when new user is created or updated..
)

module.exports=mongoose.model("User", UserSchema) ; //Users is the name of our model
