const db = require('./db.service');


async function getAll() {

    const data: any[] = []
    console.log('Data in todo.serve getAll:', data);

    return {
        data
    }
}

module.exports = {
    getAll
}

export { }

