import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:8001/"
const socket = io(SOCKET_URL);

export default socket;
