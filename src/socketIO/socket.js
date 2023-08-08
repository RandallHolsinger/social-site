import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://www.socialyze.site', { autoConnect: false });
export default socket