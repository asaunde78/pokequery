
const express = require('express')
const path = require("path");
const app = express()
const port = 3000


// async function getPoke(query) {
//     const response = await fetch(`https://pokeapi.co/api/v2/${query}`);
//     // console.log(response)
//     const data = response.json()
//     return data

// }



// console.log(poks)

app.use("/", express.static('src'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
})

app.listen(port, () => { 
    console.log("example listening")
})
