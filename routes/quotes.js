const express = require('express');
const quoteRouter = express.Router();
const { Sequelize, User, Quotes } = require('../sequelize/sequelize');


// routes with url params

//get all quote
quoteRouter.get('/quotes', async(req, res) => {
    if(req.query.limit !== undefined) {
        const quotes = await Quotes.findAll({limit: req.query.limit});
        res.json(quotes);
    }else {
        const quotes = await Quotes.findAll();
        res.json(quotes);
    }
});


// get quote by id
quoteRouter.get('/quotes/:id', async(req, res) => {
    const { id } = req.params;
    const quotes = await Quotes.findAll({where: {id}});
    res.json(quotes);
})

// get all quote by unique params
quoteRouter.get('/quotes/params/:uniqparam', async(req, res) => {
    const { uniqparam } = req.params;
    const attributes = uniqparam.split('&');
    
    const quotes = await Quotes.findAll({attributes});
    res.json(quotes);
});


// get quote by id with unique params
quoteRouter.get('/quotes/unique/:uniqparam/:id', async(req, res) => {
    const { id, uniqparam } = req.params;
    const attributes = uniqparam.split('&');
    
    const quotes = await Quotes.findOne({
        where: {
            id
        }, 
        attributes
    });
    res.json(quotes);
});

// create quote 
quoteRouter.post('/create-quote/:quote/:author', async(req, res) => {
    const { quote, author } = req.params;
    const maxId = await Quotes.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true});
    const id = maxId[0].max + 1;
    const newQuote = {
        id,
        quote,
        author
    }
    res.json(newQuote);
});


// update quote by id
quoteRouter.put('/update-quote/:quote/:author/:id', async(req, res) => {
    const { quote, author, id } = req.params;
    
    const quoteFromDB = await Quotes.findOne({where: {id}});
    if(quoteFromDB === null) {
        res.send("User don't exist");
    }
    const updatedQuote = {
        id: quoteFromDB.id,
        quote: quote !== 'null'? quote : quoteFromDB.quote,
        author: author !== 'null'? author : quoteFromDB.author
    }
    res.send(updatedQuote);
    
});

//delete quote by id
quoteRouter.delete('/delete-quote/:id', async(req, res) => {
    const { id } = req.params;
    const quote = await Quotes.findOne({where: {id}});
    res.send(quote);
});



// routes with JSON body


// get quote by id with unique params
quoteRouter.get('/quotes/unique/params', async(req, res) => {
    const { id, uniqparam } = req.body;

    if(id) {
        const quotes = await Quotes.findOne({
            where: {
                id
            }, 
            attributes: uniqparam
        });
        res.json(quotes);
    }

    const quotes = await Quotes.findAll({attributes: uniqparam}) 
    res.json(quotes);
});



// create quote
quoteRouter.post('/create-quote', async(req, res) => {
    const { quote, author } = req.body;
    const maxId = await Quotes.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true});
    const id = maxId[0].max + 1;
    const newQuote = {
        id,
        quote,
        author
    }
    res.json(newQuote);
});

// TODO: test for this routes

// update quote by id
quoteRouter.put('/update-quote', async(req, res) => {
    const { author, quote, id } = req.body;
    
    const quoteFromDB = await Quotes.findOne({where: {id}});
    if(quoteFromDB === null) {
        res.send("User don't exist");
    };
    
    const updatedQuote = {
        id: quoteFromDB.id,
        quote: quote? quote : quoteFromDB.quote,
        author: author? author : quoteFromDB.author
    };
    res.send(updatedQuote);
});


//delete quote by id
quoteRouter.delete('/delete-quote', async(req, res) => {
    const { id } = req.body;
    const quote = await Quotes.findOne({where: {id}});
    res.send(quote);
});


// export
module.exports = quoteRouter;