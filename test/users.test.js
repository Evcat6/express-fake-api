const quotes = require('../routes/quotes');
const app = require('../app').app;
const request = require("supertest");
const { User, Sequelize } = require('../sequelize/sequelize');


describe("Users route params tests", () => {
    it('Test of route "/api/users"', (done) => {
        User.findAll({raw: true}).then((data) => {
            request(app)
            .get("/api/users")
            .expect(data)
            .end(done);
        });
    });
    
    it('Test of route "/api/users/:id"', (done) => {
        const id = 2;
        User.findAll(
            {where: {id}, raw: true}
            )
            .then((data) => {
            request(app)
            .get(`/api/users/${id}`)
            .expect(data)
            .end(done);
        })
    });

    it('Test of route "/users/params/:uniqparam"', (done) => {
        const attributes = ['name', 'id'];
        User.findAll({attributes: attributes, raw: true})
            .then((data) => {
            request(app)
            .get(`/api/users/params/${attributes.join('&')}`)
            .expect(data)
            .end(done);
        });
    });

    it('Test of route "/users/unique/:uniqparam/:id"', (done) => {
        const attributes = ['name', 'email'];
        const id = 3;

        User.findOne({where: id, attributes: attributes, raw: true})
            .then((data) => {
            request(app)
            .get(`/api/users/unique/${attributes.join('&')}/${id}`)
            .expect(data)
            .end(done);
        });
    });

    it('Test of route "/api/create-user/:name/:email"', (done) => {
        const data = {
            name: 'John',
            email: 'john@example.com'
        }
        User.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true}).then((id) => {
            const newId = id[0].max + 1;
            request(app)
            .post(`/api/create-user/${data.name}/${data.email}`)
            .expect({id: newId, ...data})
            .end(done);
        });
    })

    it('Test of route "/api/update-quote/:name/:email/:id"', (done) => {
        const data = {
            id: 2,
            name: 'Lorem Ipsum'
        }

        User.findOne({where: {id: data.id}, raw: true}).then((user) => {
            user.name = data.name;

            request(app)
            .put(`/api/update-user/${data.name}/null/${data.id}`)
            .expect(user)
            .end(done);
        })
    });

    it('Test of route "/api/delete-user/:id"', (done) => {
        const id = 4;
        User.findOne({where: id, raw: true}).then((user) => {
            request(app)
            .delete(`/api/delete-user/${id}`)
            .expect(user)
            .end(done);
        });
    });
});


describe("Quote route body tests", () => {
    it('Test of route "/api/users/unique/params"', (done) => {
        const attributes = {
            uniqparam: ['name', 'id']
        };
        User.findAll({attributes: attributes.uniqparam, raw: true}).then((user) => {
            request(app)
            .get('/api/users/unique/params')
            .set('Accept', 'application/json')
            .send(attributes)
            .expect(200)
            .expect(user)
            .end(done);
        })
    });

    it('Test of route "/api/create-user"', (done) => {
        User.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true})
            .then((user) => {
                const newUser = {
                    name: 'Lorem Ipsum',
                    email: 'John' 
                }
                const expectedUser = {
                    id: user[0].max + 1,
                    name: 'Lorem Ipsum',
                    email: 'John' 
                }
                request(app)
                .post('/api/create-user')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(expectedUser)
                .expect(200)
                .end(done);
            })
    });

    it('Test of route "/api/update-user"', (done) => {
        const user = {
            id: 3,
            email: 'Lorem Ipsum'
        }
        User.findOne({where: user.id, raw: true})
        .then((data) => {
            user.name = data.name;
            request(app)
            .put('/api/update-user')
            .set('Accept', 'application/json')
            .send(user)
            .expect(200)
            .expect(user)
            .end(done);
        })
    });

    it('Test of route "/api/delete-user"', (done) => {
        const config = {
            id: 2
        };
        User.findOne({where: {id: config.id}, raw: true}).then((user) => {
            request(app)
            .del('/api/delete-user')
            .set('Accept', 'application/json')
            .send(config)
            .expect(200)
            .expect(user)
            .end(done);
        })
    });
})