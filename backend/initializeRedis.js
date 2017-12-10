const bluebird = require("bluebird");
//const flat = require("flat");
//const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const main = async () => {
    /*let hmSetAsyncGuide = await client.setAsync(`1`, JSON.stringify({guides: []}));
    
    console.log(hmSetAsyncGuide);*/
    let guideFromRedis = await client.getAsync("1");
    console.log(guideFromRedis);
    let parsedGuideFromRedis = JSON.parse(guideFromRedis);
    console.log(parsedGuideFromRedis);
    parsedGuideFromRedis.guide.push({ title: "Intro to Anti-Mage", content: "Anti-Mage is a fast melee agility carry with an emphasis on disrupting and killing high-mana enemies. He has notably high agility and low base attack time, giving him high damage and scaling with his basic attacks."});
    console.log(parsedGuideFromRedis);
    let aaa = await client.setAsync(`1`, JSON.stringify(parsedGuideFromRedis));
    let bbb = await client.getAsync("1");
    console.log(JSON.parse(bbb));
}

main()