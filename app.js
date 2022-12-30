const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const pageRouter = require('./routes/pages');
const userRouter = require('./routes/user');
const quoteRouter = require('./routes/quotes');
const { sequelize } = require('./sequelize/sequelize');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors());

sequelize.sync();


app.use('/api', userRouter);
app.use('/api', quoteRouter);

app.use('/', pageRouter);

app.listen(PORT, () => {
    console.log(PORT);
})


module.exports.app = app;