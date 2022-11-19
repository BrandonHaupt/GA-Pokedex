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



//////////////////
//    INDEX    //
/////////////////
app.get('/pokemons', (req,res)=> {
    res.render('index.ejs', 
        {
            pokeData:pokemons   
        }
    )
})


////////////////
//    NEW    //
///////////////
app.get('/pokemons/new', (req, res)=> {
    res.render('new.ejs')
})


///////////////////
//    CREATE    //
//////////////////
app.post('/pokemons', (req,res) => {
    if (req.body === undefined) {
        req.body === '#'
    } else {
        pokemons.push(req.body)
    }
    
    //redirects back to index page
    res.redirect('/pokemons')
})


//////////////////
//    EDIT     //
/////////////////
app.get('/pokemons/:id/edit', (req,res) => {
    res.render('edit.ejs', 
        {
            pokemon: pokemons[req.params.id],
            index: req.params.id
        }
    )
})


///////////////////
//    UPDATE    //
//////////////////
app.put('/pokemons/:id', (req,res) => {
    // Updating Pokemons
    pokemons[req.params.id] = req.body

    // Redirecting back to index route
    res.redirect('/pokemons')
})


///////////////////
//    DELETE    //
//////////////////
app.delete('/pokemons/:id', (req,res) => {
    pokemons.splice(req.params.id, 1)
    res.redirect('/pokemons')
})









/////////////////
//    SHOW    //
////////////////
//***** KEEP THIS AT BOTTOM *****
app.get(`/pokemons/:id`, (req,res) => {
    res.render('show.ejs', 
        {
            pokeData: pokemons[req.params.id],
            id: req.params.id
        }
    )
})


/////////////////////////////////////////
//          PORT LISTENER              //
/////////////////////////////////////////
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})