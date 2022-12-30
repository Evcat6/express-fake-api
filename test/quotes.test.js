const quotes = require('../routes/quotes');
const app = require('../app').app;
const request = require("supertest");
const { Quotes, Sequelize } = require('../sequelize/sequelize');


describe("Quote route params tests", () => {
    it('Test of route "/api/quotes"', (done) => {
        Quotes.findAll({raw: true}).then((data) => {
            request(app)
            .get("/api/quotes")
            .expect(data)
            .end(done);
        });
    });
    
    it('Test of route "/api/quotes/:id"', (done) => {
        const id = 2;
        Quotes.findAll(
            {where: {id}, raw: true}
            )
            .then((data) => {
            request(app)
            .get(`/api/quotes/${id}`)
            .expect(data)
            .end(done);
        })
    });

    it('Test of route "/quotes/params/:uniqparam"', (done) => {
        const attributes = ['quote', 'author'];
        Quotes.findAll({attributes: attributes, raw: true})
            .then((data) => {
            request(app)
            .get(`/api/quotes/params/${attributes.join('&')}`)
            .expect(data)
            .end(done);
        });
    });

    it('Test of route "/quotes/unique/:uniqparam/:id"', (done) => {
        const attributes = ['quote'];
        const id = 3;

        Quotes.findOne({where: id, attributes: attributes, raw: true})
            .then((data) => {
            request(app)
            .get(`/api/quotes/unique/${attributes.join('&')}/${id}`)
            .expect(data)
            .end(done);
        });
    });

    it('Test of route "/api/create-quote/:quote/:author"', (done) => {
        const data = {
            quote: 'John',
            author: 'john@example.com'
        }
        Quotes.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true}).then((id) => {
            const newId = id[0].max + 1;
            request(app)
            .post(`/api/create-quote/${data.quote}/${data.author}`)
            .expect({id: newId, ...data})
            .end(done);
        });
    })

    it('Test of route "/api/update-quote/:quote/:author/:id"', (done) => {
        const data = {
            id: 2,
            quote: 'Lorem Ipsum'
        }

        Quotes.findOne({where: {id: data.id}, raw: true}).then((quote) => {
            quote.quote = data.quote;

            request(app)
            .put(`/api/update-quote/${data.quote}/null/${data.id}`)
            .expect(quote)
            .end(done);
        })
    });

    it('Test of route "/api/delete-quote/:id"', (done) => {
        const id = 4;
        Quotes.findOne({where: id, raw: true}).then((quote) => {
            request(app)
            .delete(`/api/delete-quote/${id}`)
            .expect(quote)
            .end(done);
        });
    });
});


describe("Quote route body tests", () => {
    it('Test of route "/api/quotes"', (done) => {
        const attributes = {
            uniqparam: ['quote', 'id']
        };
        Quotes.findAll({attributes: attributes.uniqparam, raw: true}).then((quotes) => {
            request(app)
            .get('/api/quotes/unique/params')
            .set('Accept', 'application/json')
            .send(attributes)
            .expect(200)
            .expect(quotes)
            .end(done);
        })
    });

    it('Test of route "/api/create-quote"', (done) => {
        Quotes.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true})
            .then((quote) => {
                const newQuote = {
                    quote: 'Lorem Ipsum',
                    author: 'John' 
                }
                const expectedQuote = {
                    id: quote[0].max + 1,
                    quote: 'Lorem Ipsum',
                    author: 'John' 
                }
                request(app)
                .post('/api/create-quote')
                .set('Accept', 'application/json')
                .send(newQuote)
                .expect(expectedQuote)
                .expect(200)
                .end(done);
            })
    });

    it('Test of route "/api/update-quote"', (done) => {
        const quote = {
            id: 3,
            quote: 'Lorem Ipsum'
        }
        Quotes.findOne({where: quote.id, raw: true})
        .then((data) => {
            quote.author = data.author;
            request(app)
            .put('/api/update-quote')
            .set('Accept', 'application/json')
            .send(quote)
            .expect(200)
            .expect(quote)
            .end(done);
        })
    });

    it('Test of route "/api/delete-quote"', (done) => {
        const config = {
            id: 2
        };
        Quotes.findOne({where: {id: config.id}, raw: true}).then((quote) => {
            request(app)
            .del('/api/delete-quote')
            .set('Accept', 'application/json')
            .send(config)
            .expect(200)
            .expect(quote)
            .end(done);
        })
    });
})