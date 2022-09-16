const express = require('express');
const multer = require('multer');
const s3Service = require('./Services/S3')


const app = express();


app.post("/upload",(req, res) => {
    res.json({ status : "success" });
});

app.listen(3000, () => console.log("listening on the port 3000"));
