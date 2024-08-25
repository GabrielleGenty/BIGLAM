import "dotenv/config";
import express from 'express';
import cors from 'cors';

import router from "./router/index.routes.js";
import newSession from "./config/session.js"


const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const corsOptions = {
    origin: process.env.CLIENT_URL, // le client autorisé à communiquer avec le serveur
    methods: ["GET, POST", "PATCH", "DELETE"], // les méthodes autorisés vers le serveur
    credentials: true, // autorise la réception de cookies depuis "l'origin"
};

app.use(cors(corsOptions));
app.use(newSession);
app.use(express.json());
app.use(express.static("public"));
app.use(router);

// ...

// variable d'environnement `NODE_ENV` définit dans le fichier .env
// permets d'avoir le retour dans le terminal pertinent
const domain =
    process.env.NODE_ENV === "production" ?
    `gabriellegenty.sites.3wa.io:${PORT}` :
    `localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at http://${domain}`);
});
