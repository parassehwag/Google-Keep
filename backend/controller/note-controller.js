import User from "../model/user.js";

async function addNote(req,res){
    try{
        const foundUser= await User.findOne({username:req.body.username})
        if(!foundUser){
            return res.status(500).json({msg:'User Not Found'})
        }
        else{
            await User.updateOne({username:req.body.username},{$push: { notes: req.body.newNote }})
            return res.status(200).json({msg:'notes updated'})
        }
    }
    catch(error){
        return res.status(500).json({error:error})
    }
}

async function getNotes(req,res){
    try{
        let foundUser = await User.findOne({username:req.query.username})
        if(!foundUser){
            return res.status(500).json({msg:'user not found'})
        }
        else{
            return res.status(200).json(foundUser.notes);
        }
    }
    catch(error){
        return res.status(200).json({error:error})
    }
}

async function deleteNote(req,res){
    try{
        const result = await User.updateOne({ username: req.query.username },{ $pull: { notes: { _id: req.query.id } } })
        if(result.modifiedCount>0){
            return res.status(200).json({msg:'deleted'})
        }
        else{
            return res.status(500).json({msg:'note not found'})
        }
    }
    catch(error){
        return res.status(500).json({error:error})
    }
}

export default addNote;
export {getNotes,deleteNote};