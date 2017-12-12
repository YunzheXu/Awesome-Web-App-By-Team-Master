/*const createUser = async (username, password) => {
    let user = {
        password: password,
        guide: []
    };

    let flatUser = flat(user);
    let hmSetAsyncUser = await client.hmsetAsync(`${username}`, flatUser);
    console.log("hmSetAsyncUser:============================");
    console.log(hmSetAsyncUser);
}

const getUser = async (username) => {
    let doesHelloExist = await client.existsAsync(`${username}`);
    console.log(`doesHelloExist ? ${doesHelloExist === 1}`);
}*/

