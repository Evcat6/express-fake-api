const express = require('express');
const app = express();
const PORT = 3000;
const users = require('./Users')
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/users', (req, res, next) => {
    res.json(users)
    next();
})

app.get('/users/:id', (req, res) => {
    res.json(users[req.params.id - 1])
    next();
})


app.get('/users/:id/:uniqparam', (req, res, next) => {
    let param = req.params
    const user = users.map((user) => user[param.uniqparam])
    if (req.params.id === 'all') {
        res.json(user)
    }
    res.json(user[param.id])
    next();
})

app.listen(PORT, () => {
    console.log(PORT);
})
