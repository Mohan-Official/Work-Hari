const express = require("express");
const app = express();
const ejs = require("ejs");
app.set("view engine","ejs");

const path = require("path");
const fs = require("fs/promises");

const port = 3500;
app.use(express.static('public'));

app.get("/",(req,res)=>
{
    const jsonData = fs.readFile("consolidatedSummary_NON_MRIO_Projects.json", "utf-8");
    const data = JSON.parse(jsonData);
    res.sendFile(path.join(__dirname, '/ConsolidatedSummaryPage_NON_MRIO_Projects.html'),{data});
})

app.listen(port,()=>
{
    console.log(`Server started at port number: ${port}`);
})