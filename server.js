var express = require('express');
var path =require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
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

console.log(process.env.NODE_ENV,'nodeserver=jj ');
if(process.env.NODE_ENV ==='dev'){
    let webpackconfig = require('./webpack/dev.config');
    webpackconfig(app)
    var ripath='/dist/';
}else{
    var ripath='/server/dist/';
}

app.use('/lexiugo-app', require('./api'));
app.get('/server',(req,res,next)=>{
    console.log(req.query);
    var arr={loveCarRepair:'维修记录',lexiuApp:'修理厂',reportStatistics:'透明修车',newBuild:'案件推修'}
    var dataList={
        path:'http://qq328532063.6655.la/dist/'+req.query.action || ripath+(req.query.action || 'lexiuApp'),
        title:arr[req.query.action]
    }
    res.render('index',{dataList:dataList});
})
//app.use('/lexiugo-app',require('./api'))  ;



app.listen(8099,()=>{
    console.log('local:localhost:８０99');
});