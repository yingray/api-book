const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const port = 9000;

app.use(compression());
app.use(express.static('./'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.get('/bundle.js', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'bundle.js'));
});

app.get('/api/intro', (req, res) => {
    res.json({
        name: 'yingray',
        msg: 'hello world!'
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port} (http://localhost:${port})`);
});