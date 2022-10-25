import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:8001/api/matching"
const socket = io(SOCKET_URL);

// socket.on("disconnect", (reason) => {
//   socket.emit('user disconnected');
// });

export default socket;
