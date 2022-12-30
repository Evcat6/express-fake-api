const express = require('express');
const userRouter = express.Router();
const { Sequelize, User } = require('../sequelize/sequelize');


// routes with url params

//get all users
userRouter.get('/users', async(req, res) => {
    if(req.query.limit !== undefined) {
        const users = await User.findAll({limit: req.query.limit});
        res.json(users);
    }else {
        const users = await User.findAll();
        res.json(users);
    }
});


// get user by id
userRouter.get('/users/:id', async(req, res) => {
    const users = await User.findAll({where: {id: req.params.id}})
    res.json(users);
})

// get all users by unique params
userRouter.get('/users/params/:uniqparam', async(req, res) => {
    const { uniqparam } = req.params;
    const attributes = uniqparam.split('&');
    
    const users = await User.findAll({attributes});
    res.json(users);
});


// get user by id with unique params
userRouter.get('/users/unique/:uniqparam/:id', async(req, res) => {
    const { id, uniqparam } = req.params;
    const attributes = uniqparam.split('&');
    
    const users = await User.findOne({
        where: {
            id
        }, 
        attributes
    });
    res.json(users);
});

// create user 
userRouter.post('/create-user/:name/:email', async(req, res) => {
    const { name, email } = req.params;
    const maxId = await User.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true});
    const id = maxId[0].max + 1;
    const newUser = {
        id,
        name,
        email
    }
    res.json(newUser);
});


// update user by id
userRouter.put('/update-user/:name/:email/:id', async(req, res) => {
    const { name, email, id } = req.params;
    
    const userFromDB = await User.findOne({where: {id}});
    if(userFromDB === null) {
        res.send("User don't exist");
    }
    const updatedUser = {
        id: userFromDB.id,
        name: name !== 'null'? name : userFromDB.name,
        email: email !== 'null'? email : userFromDB.email
    }
    res.send(updatedUser);
    
});

//delete user by id
userRouter.delete('/delete-user/:id', async(req, res) => {
    const { id } = req.params;
    const user = await User.findOne({where: {id}});
    res.send(user);
});



// routes with JSON body


// get user by id with unique params
userRouter.get('/users/unique/params', async(req, res) => {
    const { id, uniqparam } = req.body;

    if(id) {
        const users = await User.findOne({
            where: {
                id
            }, 
            attributes: uniqparam
        });
        res.json(users);
    }

    const users = await User.findAll({attributes: uniqparam}) 
    res.json(users);
});

// create user
userRouter.post('/create-user', async(req, res) => {
    const { name, email } = req.body;
    const maxId = await User.findAll({attributes: [Sequelize.fn('max', Sequelize.col('id'))], raw: true});
    const id = maxId[0].max + 1;
    const newUser = {
        id,
        name,
        email
    }
    res.json(newUser);
});


// update user by id
userRouter.put('/update-user', async(req, res) => {
    const { name, email, id } = req.body;
    
    const userFromDB = await User.findOne({where: {id}});
    if(userFromDB === null) {
        res.send("User don't exist");
    };
    
    const updatedUser = {
        id: userFromDB.id,
        name: name? name : userFromDB.name,
        email: email? email : userFromDB.email
    };
    res.send(updatedUser);
});


//delete user by id
userRouter.delete('/delete-user', async(req, res) => {
    const { id } = req.body;
    const user = await User.findOne({where: {id}});
    res.send(user);
});


// export
module.exports = userRouter;