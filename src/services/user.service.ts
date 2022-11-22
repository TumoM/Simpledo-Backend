import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
let db = require('./db.service');
const bcrypt = require("bcrypt")

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number | null;
    declare name: string;
    declare email: string;
    declare password: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(225),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, { sequelize: db });

async function getAll() {

    const data = await User.findAll();
    console.log('We got all users?');
    console.log("All users:", JSON.stringify(data, null, 2));

    return {
        data
    }
}

async function getById(id: number) {

    const data = await User.findAll({
        where: {
            id: [id]
        }
    });
    console.log('We got one users?');
    console.log("One user:", JSON.stringify(data, null, 2));


    return {
        data: data[0] || undefined
    }
}

async function createUser(name: string, email: string, hashedPassword: string) {

    const data = await User.findAll({
        where: {
            email: [email] // Same as using `id: { [Op.in]: [1,2,3] }`
        }
    });
    console.log('We got one users on registration?');
    console.log("One user registration:", JSON.stringify(data, null, 2));
    if (data.length > 0) {
        // We already have a user with that email
        console.log('Duplicate user')
        return { message: 'Duplicate user' }
    }
    else {
        // We register the new user
        const res = await User.create({ name, email, password: hashedPassword })
        console.log('Res from registration', JSON.stringify(res, null, 2));
        return { data: res }
    }

}

async function loginUser(email: string, password: string) {

    const data = await User.findAll({
        where: {
            email: [email]
        }
    });
    console.log('We got one users on registration?');
    console.log("One user registration:", JSON.stringify(data, null, 2));
    if (data.length > 0) {
        console.log('Found user')
        const user = data[0];
        const hashedPassword = user.password
        //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
            console.log("---------> Login Successful")
            return { status: 200, message: 'Login Successful' }
        }
        else {
            console.log("---------> Password Incorrect")
            return { status: 400, message: 'Password Incorrect' }
        }
    }
    else {
        return { message: 'No user found', status: 404 }

    }

}

module.exports = {
    getAll,
    getById,
    createUser,
    loginUser
}

export { }