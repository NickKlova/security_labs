const {
    addTokenFromCookieToHeadersMiddleware,
    checkJwtMiddleware,
    unauthorizedMiddleware,
} = require('./middleware');
const { login, register, logout, getServerToken } = require('./service');
const path = require('path');
const request = require('request');
require('dotenv-expand').expand(require('dotenv').config());

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/register.html'));
});
app.post('/api/login', (req, res) => login(req, res));
app.post('/api/register', (req, res) => register(req, res));

app.use(addTokenFromCookieToHeadersMiddleware);
app.use(checkJwtMiddleware);
app.use(unauthorizedMiddleware);

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/dashboard.html'));
});
app.post('/api/logout', (req, res) => logout(req, res));

getServerToken();
setInterval(() => getServerToken(), 82800000); 

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
