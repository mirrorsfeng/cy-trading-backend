
const findIsOnline = (list, userName) => {
    const stand = list.find((item) => {
        return item.userName === userName
    })
    return stand
}

module.exports = {
    findIsOnline
}