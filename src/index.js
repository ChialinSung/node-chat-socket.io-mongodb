const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
//数据库连接
mongoose.connect('mongodb://localhost/chat-database')
.then(db =>console.log('db is connected!'))
.catch(err => console.log(err));

//设置
app.set('port',process.env.PORT || 3000);
//静态文件
app.use(express.static(path.join(__dirname,'public')));
require('./sockets')(io);
//服务器端口
server.listen(app.get('port'), () => {
  console.log('server on port'+app.get('port'));
});