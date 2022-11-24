import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
let db = require('./db.service');
const bcrypt = require("bcrypt")

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    declare id: number | null;
    declare userId: number;
    declare title: string;
    declare status: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: new DataTypes.STRING(225),
        allowNull: false,
    },
    status: {
        type: new DataTypes.ENUM('complete', 'incomplete') || null,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, { tableName: 'todos', sequelize: db });

async function getAll() {

    const data = await Todo.findAll();

    return {
        data
    }
}

async function getById(id: number) {

    const data = await Todo.findAll({
        where: {
            id: [id]
        }
    });
    return {
        data: data[0] || undefined
    }
}

async function getAllByUserId(userId: number) {

    const data = await Todo.findAll({
        where: {
            userId: [userId]
        }
    });

    return {
        data: data || undefined
    }
}
async function createTodo(userId: number, title: string) {

    const res = await Todo.create({ userId, title, })
    return { data: res }

}
async function updateStatus(id: number, userId: number, status: string) {

    const res = await Todo.update({ status }, {
        where: {
            id,
            userId // Just adds some extra security so that only the 'owner' can update the status
        }
    });
    return { data: res }

}

async function deleteById(id: number) {

    const res = await Todo.destroy({
        where: {
            id
        }
    });
    return { data: res }

}


module.exports = {
    getAll,
    getById,
    getAllByUserId,
    createTodo,
    updateStatus,
    deleteById
}

export { }