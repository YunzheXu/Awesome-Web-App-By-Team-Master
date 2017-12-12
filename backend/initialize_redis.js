const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let obj={
    guide:[]
};

const main = async () => {
    for(let i=1;i<=120;i++){
        let t = await client.setAsync(i.toString(), JSON.stringify(obj));
    }
    /*let obj={
        guide:[]
    };
    let hmSetAsyncBio = await client.setAsync("1", JSON.stringify(obj));
    console.log(hmSetAsyncBio);*/
    /*let hello = await client.getAsync("1");
    let a=JSON.parse(hello);
    console.log(a);
    a.guide.push("abc");
    let hmSetAsyncBio = await client.setAsync("1", JSON.stringify(a));
    console.log(hmSetAsyncBio);
    let hello = await client.getAsync("1");
    console.log(hello);*/
};

main();