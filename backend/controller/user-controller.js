import User from "../model/user.js";
import bcrypt from "bcrypt";

function signUpUser(req,res){
    try{
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            const newUser = new User({
                username:req.body.username,
                password:hash
            })
            newUser.save();
        });
        return res.status(200).json({msg:'signUp Successfull'})
    }
    catch(error){
        return res.status(500).json({error:error})
    }
}

async function loginUser(req,res){
    try{
        const foundUser = await User.findOne({username:req.body.username});
        if(!foundUser){
            return res.status(501).json({msg:'User not found'})
        }
        else{
            bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                if(result===true){
                    return res.status(200).json({msg:'Login Successfull'})
                }
                else{
                    return res.status(502).json({msg:'Wrong Password'})
                }
            });
        }
    }
    catch(error){
        return res.status(500).json({error:error})
    }
}

export default signUpUser;
export {loginUser};