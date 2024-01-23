import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const kepperUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notes:{
        type:[noteSchema]
    }
})

const Kepper = new mongoose.model('Kepper',kepperUserSchema);

export default Kepper;