wrap = async (answer) => (await answer).result

/* This API call will return a list of all ZTS tokens */
const getAll = (client, pageIndex, pageSize) => {
    return wrap(client('embedded.token.getAll', [pageIndex, pageSize]));
}

/* This API call will return the list of ZTS issued by an address */
const getByOwner = (client, ownerAddress, pageIndex, pageSize) => {
    return wrap(client('embedded.token.getByOwner', [ownerAddress, pageIndex, pageSize]));
}

/* This API call will return the ZTS with the specified unique identifier */
const getByZts = (client, zts) => {
    return wrap(client('embedded.token.getByZts', [zts]));
}

module.exports = {
    getAll,
    getByOwner,
    getByZts
}
