require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet');
const cors = require('cors')
const movieData = require('./movieData.json')

const app = express()

app.use(cors());
app.use(helmet());

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');

    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request'});
    }

    next();
})

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
    
    if (req.query.avg_vote) {
        const value = parseFloat(req.query.avg_vote);
        response = response.filter(movie => movie.avg_vote >= value
        )

    }

    res.json(response)
})

app.use((error, req, res, next) => {
    let response
    if (response.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error'} }
    } else { error }
    res.status(500).json(response)
})

const PORT = process.env.PORT || 8000

app.listen(PORT)

