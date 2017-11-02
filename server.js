var express = require('express');
var path =require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
var superagent = require('superagent');
var app=express();
var router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/');

app.use('/dist', express.static('dist'));
app.use('/lexiugo', express.static('dist/lexiugo'));
app.use('/server/dist', express.static('dist'));
app.use('/server/lexiugo', express.static('dist/server/lexiugo'));

if(process.env.NODE_ENV ==='dev'){
    global.ripath='/dist/';
}else{
    global.ripath='/server/dist/';
}

app.use('/lexiugo-app', require('./api'));//toumingxiu/
app.use('/server', require('./serverApi'));



app.listen(8099,()=>{
    console.log('local:localhost:８０99');
});