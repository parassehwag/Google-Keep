import express from 'express';
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import Router from './route.js';
import Connection from './DbConnection/Connection.js';
const app = express();

app.use(cors({
  origin: "https://google-keeper-chi.vercel.app",
  methods: ["POST", "GET", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: "Verysecretstring",
    resave: false,
    saveUninitialized: false
}))

const PORT = 8000;
app.use("/",Router);

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})

Connection();
