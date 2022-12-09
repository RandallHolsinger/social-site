import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000/', {autoConnect: false});
export default socket