import io from "socket.io-client";

const socket = io('http://localhost:3001');

let obj = {
    store(id, title, content) {
        socket.emit('createGuide', {
            heroId: id,
            guideTitle: title,
            guideContent: content
        });
    },
    getGuideByHeroId(id) {
        return new Promise((resolve, reject) => {
            socket.emit('getGuide', id);
            socket.on('getGuide', (guides) => {
                if (guides) {
                    resolve(guides);
                } else {
                    reject("No guides!");
                }
            }); 
        });
    }
}
export default obj;



/*const bluebird = require("bluebird");
//const flat = require("flat");
//const unflatten = flat.unflatten
const redis = require('redis');*/

/*import bluebird from "bluebird";
import redis from "redis";
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let obj = {
    async store(id, title, content) {
        let guideList = await client.hgetallAsync(id);
        guideList.push({
            title: title,
            content: content
        });
        let hmSetAsyncId = await client.hmsetAsync(id, guideList);
    },
    async guideInit() {
        for (let i = 1; i <= 120; i++) {
            let hmSetAsyncId = await client.hmsetAsync(i.toString(), []);
        }
        alert("aaa");
    }
}


module.exports = obj;*/
//export default store;


