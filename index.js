import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
}) 

app.post("/submit", async(req, res) => {
    const ifscCode = req.body.IFSC
    try{
        const response = await axios.get("https://bank-apis.justinclicks.com/API/V1/IFSC/"+ifscCode);
        const result = response.data
        res.render("index.ejs", {data: result});

    } catch(error){
        res.render("index.ejs", {errorMesg: "Incorrect IFSC Code"})
        console.log(error.response.data)
    }
})
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})