let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const bluebird = require("bluebird");
//const flat = require("flat");
//const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

io.on('connection', (socket) => {
    socket.on('createGuide', (newGuide) => {
        console.log(newGuide);
        
        //io.emit('chat message', msg);
    });

    socket.on('getGuide', async (id) => {
        console.log(id);
        let guideFromRedis = await client.getAsync(`${id}`);
        //console.log(guideFromRedis);
        console.log(JSON.parse(guideFromRedis));
        io.emit('getGuide', JSON.parse(guideFromRedis));
    });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});