const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//CRUD operations done in this page.

//update user
router.put("/:id", async (req, res) => {
    if ((req.body.userId == req.params.id) || req.body.isAdmin) { 
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }   
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated.")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else { 
        return res.status(403).json("You can update only your account.");
    }
})

    //delete user 
    router.delete("/:id", async (req, res) => {
        if ((req.body.userId == req.params.id) || req.body.isAdmin) {   
            try {
                const user = await User.deleteOne({_id: req.params.id});
                res.status(200).json("Account has been deleted.")
            } catch (err) {
                return res.status(500).json(err);
            }
        } else { 
            return res.status(403).json("You can delete only your account."); 
        }
    })

    //get a user 
    router.get("/:id",async(req,res)=>{ 
        try{ 
            const user = await User.findById(req.params.id);
            const {password,updatedAt , ...other} = user._doc
            res.status(200).json(other);
        }catch(err){ 
            res.status(500).json(err);
        }
    });

    //follow user
    router.put("/:id/follow", async (req, res) => {
        if ((req.body.userId !== req.params.id))
       { try{
            const user = await User.findById(req.params.id); //ronaldo
            const currentUser = await User.findById(req.body.userId);//me
            if(!user.followers.includes(req.body.userId)){ 
                console.log("one");
                await user.updateOne({$push:{followers:req.body.userId}});
                console.log(req.params.id);

                await currentUser.updateOne({$push:{following:req.params.id}});

                console.log("three"); 

                res.status(400).json("The user has been followed."); 

            }else{
                res.status(403).json("You already follow this user.");

            }
        }catch(err){ 
            console.log("here");
            res.status(500).json(err);
        }}
        else{ 
            res.status(403).json("You cannot follow yourself");
    }
    })
    //unfollow user
    router.put("/:id/unfollow", async (req, res) => {
        if ((req.body.userId !== req.params.id))
       { try{
            const user = await User.findById(req.params.id); //ronaldo
            const currentUser = await User.findById(req.body.userId);//me
            if(user.followers.includes(req.body.userId)){ 
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});

                res.status(400).json("The user has been unfollowed."); 
            }else{
                res.status(403).json("You can't unfollow the user you haven't followed.");
            }
        }catch(err){ 
            console.log("here");
            res.status(500).json(err);
        }}
        else{ 
            res.status(403).json("You cannot unfollow yourself");
    }
    })


module.exports = router;
