var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const fs = require('fs');
var im = require('imagemagick');
var base64Img = require('base64-img');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

function work(){
  return new Promise((resolve,reject)=>{
    im.resize({
      srcData: fs.readFileSync('old.png', 'binary'),
      height:256,
      width: 256
    }, (err, stdout, stderr)=>{
      if (err) throw err;
      fs.writeFileSync('new.png', stdout, 'binary');
      resolve('fine');
    });  
  });
}

io.on('connection', function(socket){
    socket.on('store', async (obj)=>{

      let data = obj.file.replace(/^data:image\/\w+;base64,/, "");
      let buf = new Buffer(data, 'base64');
      fs.writeFileSync('old.png', buf);
      await work();
      let img = base64Img.base64Sync('new.png');

      let getfromredis=await client.getAsync(obj.id.toString());
      let result=JSON.parse(getfromredis);
      let newguide={
        title:obj.title,
        content:obj.content,
        file:img
      };
      result.guide.push(newguide);
      let hmSetAsync = await client.setAsync(obj.id.toString(), JSON.stringify(result));
    });
    socket.on('getguide',  async (id)=>{
      let getfromredis=await client.getAsync(id.toString());
      let result=JSON.parse(getfromredis);
      io.emit('display', result);
    });
});

http.listen(3001, function(){
  console.log('listening on :3001');
});