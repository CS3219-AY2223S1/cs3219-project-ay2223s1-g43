import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:3001/"
const socket = io(SOCKET_URL, { withCredentials: true});

// socket.on("disconnect", (reason) => {
//   socket.emit('user disconnected');
// });

export default socket;
