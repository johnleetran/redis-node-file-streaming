const redis = require("redis");
require('redis-streams')(redis);

const rstream = require('redis-rstream');
const express = require('express');
const app = express();
const fs = require('fs');

const client = redis.createClient(6379, '127.0.0.1', { detect_buffers: true });

client.on("error", function (error) {
    console.error(error);
});

app.put("/upload", (req, res) => {
    let queryParam = req.query;
    req.pipe(client.writeStream(queryParam.key, 3600))
        .on('finish', ()=>{
            res.json({ "status": "ok" })
        });
})

app.get("/content", (req, res) => {
    let queryParam = req.query;
    rstream(client, queryParam.key).pipe(res);
})

app.listen(3000, () => {
    console.log("started: port 3000")
})