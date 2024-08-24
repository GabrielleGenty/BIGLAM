import "dotenv/config";
import express  from 'express';
import cors from 'cors';

import router from "./router/index.routes.js";
import newSession from "./config/session.js"


const app = express();

const corsOptions = cors({
	origin: process.env.HOST,
	credentials: true,
});

app.use(corsOptions);
app.use(newSession);

app.use(express.json()); 
app.use(express.static("public"));
app.use(router);

 app.listen(process.env.LOCAL_PORT,()=>{
	console.log("server is running on " + process.env.HOST +process.env.LOCAL_PORT);

 });