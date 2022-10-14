const { createServer } = require('http');
const { deletePendingMatch, deleteMatch, insertNewPendingMatch, isMatchAvailable, insertNewMatch, getNameOfUserMatchedTo } = require('./matching-orm')
const { sequelize } = require('./repository.js')
const { v4: uuidv4 } = require('uuid')

const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors')
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000' // might need to change this later
  }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// socket array
let socketArr = [] // an element will look like { socketId: ___, userName: ___ }

const addSocketObj = (userName, socketId) => {
  socketArr = socketArr.filter(socketObj => socketObj.userName !== userName);

  socketArr.push({
    userName,
    socketId,
  })
}

const getSocketIdForUser = (userName) => {
  const socketObjForUser = socketArr.find(socketObj => socketObj.userName === userName);
  return socketObjForUser.socketId;
}


io.on("connection", (socket) => {

  socket.on('user finding match', async ({ userName, difficulty }) => {
    try {
      // add a socket object for this user to the socket array if he doesnt have one
      addSocketObj(userName, socket.id);

      await deleteMatch(userName);

      const matchResult = await isMatchAvailable(difficulty)

      if (!matchResult) {
        /* no match was found, so add this user to db as a pending match*/
        // we might replace adding and removing from db with a queue implementation instead to save on db calls
        await insertNewPendingMatch(userName, difficulty);

      } else {
        // match is found, we want to emit an event to both users who are matched
        const matchedUserName = matchResult.userName;
        // 1. Delete the user who is currently a pending match
        await deletePendingMatch(userName);
        await insertNewMatch(userName, matchedUserName, difficulty);

        // 2. Generate collab unqiue room id and password
        const room = uuidv4();
        const password = uuidv4();

        // 3. Send an event to both user's frontend that includes each other's socketId
        const socketIdOfUser1 = getSocketIdForUser(matchedUserName);
        const socketIdOfUser2 = getSocketIdForUser(userName);

        io.to(socketIdOfUser1).emit('matchSuccess', { matchedSocketId: socketIdOfUser2, room: room, password: password });
        io.to(socketIdOfUser2).emit('matchSuccess', { matchedSocketId: socketIdOfUser1, room: room, password: password });
      }
    } catch (error) {
      console.error(error.message)
    }
  });

  // frontend MUST emit this event upon timer timing out
  socket.on('matching timer expired', async ({ userName }) => {
    // just need to delete pending match for this user
    await deletePendingMatch(userName);
  })

  // frontend MUST emit this event in callback function that is called upon the 'disconnect' event
  socket.on('user disconnected', async ({ userName }) => {
    console.log("user disconnected")
    await deletePendingMatch(userName);
    await deleteMatch(userName);
    socketArr = socketArr.filter(socketObj => socketObj.userName !== userName);
  })

  socket.on('get partner name', async ({ userName }, callback) => {
    const nameOfOtherUser = await getNameOfUserMatchedTo(userName);
    callback({
      partnerUsername: nameOfOtherUser
    });
  })

  // frontend MUST emit this event when a user that is matched has logged out or chose to leave the room
  socket.on('user leave room', async ({ userName }) => {
    console.log(`user with username ${userName} has left the room`);

    // emit to the other user so that he/she will leave the room
    const nameOfOtherUser = await getNameOfUserMatchedTo(userName);

    if (nameOfOtherUser) {
      const socketIdOfOtherUser = getSocketIdForUser(nameOfOtherUser);
      io.to(socketIdOfOtherUser).emit('matched user left room');

      await deleteMatch(userName);
    }
  })

})


sequelize.sync({ alter: true }).then(() => httpServer.listen(8001, () => console.log("matching-service listening on port 8001")));
