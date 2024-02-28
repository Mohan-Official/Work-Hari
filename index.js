const express = require("express");
const app = express();

const path = require("path");
const port = 3500;

app.use(express.static('public'));

app.get("/summary",(req,res)=>
{
    res.sendFile(path.join(__dirname, '/ConsolidatedSummaryPage_NON_MRIO_Projects.html'));
})

app.listen(port,()=>
{
    console.log(`Server started at port number: ${port}`);
})