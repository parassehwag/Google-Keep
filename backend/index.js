import express from 'express';
const app = express();
import cors from "cors";
app.use(cors({
  origin: '*',
  methods: ["POST", "GET", "DELETE"],
  credentials: true
}));

import session from "express-session";
import bodyParser from "body-parser";
import Router from './route.js';
import Connection from './DbConnection/Connection.js';

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
