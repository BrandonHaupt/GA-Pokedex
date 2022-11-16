require("dotenv").config()
const express = require("express")
const app = express ()
const methodOverride = require("method-override")
const pokemons = require('./models/pokemon')
const PORT = process.env.PORT

// allows us to use the DELETE method
app.use(methodOverride('_method'))

// Allows us to use the styles.css
app.use('/static', express.static("public"))

// HOME ROUTE
app.get('/', (req,res) => res.redirect('/pokemons'))



// Allows us to access local server
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})