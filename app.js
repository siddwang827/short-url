require('dotenv').config();
const express = require('express');
const { AutoIncrement } = require("./model/autoincrement.js");
const { multiDB } = require("./model/database")
const hostname = process.env.HOST
const writeHost = process.env.DB_WRITE_HOST


// let urlCount = range.rangeIndex.min;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => res.send("Hi"));
app.get("/:short_url", async (req, res) => {

    let shortUrl = req.params.short_url
    let decode = Buffer.from(shortUrl, 'base64').toString()
    let [hostTag, id] = decode.split('/')
    const result = await AutoIncrement.getLongUrl(hostTag, id)

    res.status(200).json(result.long_url)
    return
}

);

app.post("/shorten", async (req, res) => {

    let originUrl = req.body.originUrl

    const result = await AutoIncrement.createShortUrl(originUrl)
    const insertId = (result.insertId).toString()
    const databaseHostTag = multiDB[writeHost].hostTag

    let encode = Buffer.from(databaseHostTag + '/' + insertId).toString('base64')

    res.status(200).json({ result: `http://${hostname}/${encode}` })

}

);




const port = process.env.PORT;

app.listen(port, () =>
    console.log(`Server listenig on port: ${port}`)
)

