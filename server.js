const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const movieData = require('./movieData.json')

const app = express()

app.use(morgan('dev'))
app.use(cors())

// app.use((req, res) => {
  
// })

app.get('/movie', function handleGetMovie(req, res) {
    let response = movieData;
    
    if (req.query.genre) {
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())    
        )
    }

    if (req.query.country) {
        response = response.filter(movie => 
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }



    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})



console.log('hello')