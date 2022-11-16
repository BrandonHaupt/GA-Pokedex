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

// INDEX ROUTE
app.get('/pokemons', (req,res)=> {
    res.render('index.ejs', 
        {
            pokeData:pokemons   
        }
    )
})

// CREATE A ROUTE - Recieves data from the form on new.ejs and pushes it to the body of our index.ejs
app.post('/pokemons', (req,res) => {
    pokemons.push(req.body)

    res.redirect('/pokemons')
})

// EDIT ROUTE 
app.get('/pokemons/:id/edit', (req,res) => {
    res.render('edit.ejs', 
        {
            pokemon: pokemons[req.params.id],
            index: req.params.id
        }
    )
})

// UPDATE ROUTE
app.put('/pokemons/:id', (req,res) => {
    // Updating Pokemons
    pokemons[req.params.id] = req.body

    // Redirecting back to index route
    res.redirect('/pokemons')
})


// DELETE ROUTE 
app.delete('/pokemons/:id', (req,res) => {
    res.splice(req.params.id, 1)
    res.redirect('/pokemons')
})


// SHOW ROUTE Everything else goes above
app.get(`/pokemons/:id`, (req,res) => {
    res.render('show.ejs', 
        {
            pokeData: pokemons[req.params.id],
            id: req.params.id
        }
    )
})



// Allows us to access local server
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})