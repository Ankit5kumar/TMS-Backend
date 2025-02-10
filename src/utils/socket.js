
const socketIo = require('socket.io');
let io;
module.exports={
    init:(server , options)=>{
        io = socketIo(server , options);
        return io;
    },
    getIo:()=>{
        if(!io){
throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};
