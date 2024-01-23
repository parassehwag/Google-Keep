import express, { Router } from "express";


//serverRequest
import signUpUser,{loginUser} from "./controller/user-controller.js"
import addNote,{getNotes,deleteNote} from './controller/note-controller.js'

const router = express.Router();

router.post('/singnUp', signUpUser);
router.post('/login', loginUser);
router.post('/addNote',addNote);
router.get('/getNotes',getNotes);
router.delete('/deleteNote',deleteNote);

export default router;