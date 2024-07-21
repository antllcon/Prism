let rooms = {
    333333: {
        clients: [123],
        message: [],
    },
};

function findRoomBySocketId(id) {
    let foundId;
    Object.keys(rooms).forEach((roomId) => {
        if (rooms[roomId].clients.includes(id)) {
            foundId = roomId;
        }
    });
    if (foundId) {
        return foundId;
    } else {
        return false;
    }
}
// console.log(findRoomBySocketId(123));

/*
function findRoomBySocketId(id) {
    Object.keys(rooms).forEach((roomId) => {
        if (rooms[roomId].clients.includes(id)) {
            return roomId;
        }
    });
    return false;
}
*/
