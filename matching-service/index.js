import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import models, { deletePendingMatch, insertNewPendingMatch, isMatchAvailable, sequelize } from './matching-orm';
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000' // might need to change this later
  }
})

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// socket array
const socketArr = [] // an element will look like { socketId: ___, userName: ___ }

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

  socket.on('user finding match', ({ userName, difficulty }) => {
    try {
      // add a socket object for this user to the socket array if he doesnt have one
      addSocketObj(userName, socket.id);

      const matchResult = !isMatchAvailable(difficulty)

      if (!matchResult) {
        /* no match was found, so we emit an event to this user's frontend for them to start a 30s timer, and add this user to db as
          a pending match*/
        // we might replace adding and removing from db with a queue implementation instead to save on db calls
        
        // 1. emit an event to this user's frontend
        io.to(socket.id).emit('no immediate match found');

        // 2. add this user to db as a pending match
        await insertNewPendingMatch(userName, difficulty);

      } else {
        // match is found, we want to emit an event to both users who are matched
        const matchedUserName = matchResult.userName;

        // 1. Delete the user who is currently a pending match
        await deletePendingMatch(userName);

        // 2. Send an event to both user's frontend that includes each other's socketId
        const socketIdOfUser1 = getSocketIdForUser(matchedUserName);
        const socketIdOfUser2 = getSocketIdForUser(userName);


        io.to(socketIdOfUser1).emit('matchSuccess', socketIdOfUser2);
        io.to(socketIdOfUser2).emit('matchSuccess', socketIdOfUser1);

      }
    } catch (error) {
      console.error(error.message)
    }
  });

  // frontend MUST emit this event upon timer timing out
  socket.on('matching timer expired', ({ userName }) => {
    // just need to delete pending match for this user
    await deletePendingMatch(userName);
  })

  // frontend MUST emit this event in callback function that is called upon the 'disconnect' event
  socket.on('user disconnected', ({ userName }) => {
    await deletePendingMatch(userName);

    socketArr = socketArr.filter(socketObj => socketObj.userName !== userName);
  })

})



sequelize.sync().then(() => httpServer.listen(8001))
