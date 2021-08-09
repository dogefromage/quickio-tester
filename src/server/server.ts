import path from "path";
import * as express from "express";
import * as socketio from "socket.io";

const app = require('express')();
const port = Number(process.env.PORT || 6969);
app.set('port', port);

let http = require("http").Server(app);
let io: socketio.Server = require("socket.io")(http);

app.use(express.static(path.resolve(process.cwd(), 'dist/client/')))

app.get("/", (req: express.Request, res: express.Response) => 
{
    res.sendFile(path.resolve(process.cwd(), 'src/client/index.html'));
});

const server = http.listen(port, () =>
{
    console.log('Server listening on port ' + port);
});