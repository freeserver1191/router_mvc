const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.static("asset"));

// Set content type GLOBALLY for any response.
app.use(function (req, res, next) {
    res.contentType('application/vnd.api+json');
    next();
});

app.use('/user', require('./api/user/index.js'));

app.use('/keyword', require('./api/keyword/index.js'));

app.use('/search', require('./api/search/index.js'));

app.get('/', (req, res) => {
    let api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=NXUnBi1hGRDD0YALBt0h&redirect_uri=http://52.79.164.94:3000/user/login/callback&state=naver@312';
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
})

module.exports = app;