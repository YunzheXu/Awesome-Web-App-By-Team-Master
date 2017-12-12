import io from 'socket.io-client';
const socket = io('http://localhost:3001');

let obj = {
    store(id, title, content,file) {
        let guide={
            id:id,
            title:title,
            content:content,
            file:file
        };
        socket.emit('store', guide);
    },
    display(id){
        socket.emit('getguide', id);
        return new Promise((resolve,reject)=>{
            socket.on('display', (obj)=>{
                resolve(obj);
            });
        });
    }
}

export default obj;


