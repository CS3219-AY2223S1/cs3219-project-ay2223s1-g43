import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_ENV_SOCKET_URL || "http://localhost:8001/"

const socket = io(SOCKET_URL, {
  path: "/api/matching",
});

export default socket;
