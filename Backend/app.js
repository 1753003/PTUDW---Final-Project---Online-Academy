const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.json("Running...");
})

app.use('/api/category', require('./routes/category.route'));
app.use('/api/course', require('./routes/course.route'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Backend is runnning at http://localhost:${PORT}`);
})