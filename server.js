const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//const quotesRouter = express.Router();

//app.use('/quotes', quotesRouter)

app.get('/api/quotes', (req, res, next) => {
    let array = [];
    const author = req.query.person;
    if (author) {
        array = quotes.filter(quote => quote.person === author);
    } else array = quotes;
    res.send({"quotes": array});
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({"quote": randomQuote});
    
});

app.post('/api/quotes', (req, res, next) => {
    const author = req.query.person;
    const quote = req.query.quote;
    const newQuote = {'quote': quote, 'person': author}
    if(author && quote) {
        quotes.push(newQuote);
        res.send({"quote": newQuote});
    } else {
        res.status(400).send();
    }
});


app.listen(PORT, () => {console.log(`Server is listening to port ${PORT}`)});