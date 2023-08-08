import socketIO from 'socket.io-client';
const socket = socketIO.connect([
  'http://localhost:3000/',
  'https://socialyze.site',
  'https://www.socialyze.site'
], { autoConnect: false });
export default socket