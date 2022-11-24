import { Request, Response } from "express";
const service = require('../services/user.service');
const bcrypt = require("bcrypt")
require("dotenv").config();

/**
 * user.controller.ts
 *
 * @description :: Server-side logic for managing users.
 */
export default {
    /**
     * user.controller.list()
     * Lists all users in the DB
     */
    list: async function (req: Request, res: Response) {
        try {
            const data = await service.getAll();
            // console.log('data in controller:', JSON.stringify(data, null, 2))
            return res.status(200).json(data);
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error fetching users",
                error: error,
            });
        }
    },

    /**
     * user.controller.show()
     * Gets a user via their ID
     */
    show: async function (req: Request, res: Response) {
        const id = req.params.id;

        try {
            const data = await service.getById(id);
            if (data?.data) {
                return res.status(200).json(data);
            }
            else {
                return res.status(404).json({ message: 'No user found' });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error fetching user",
                error: error,
            });
        }

    },

    /**
     * user.controller.create()
     * Creates/Registers new user in the User Table
     */
    create: async function (req: Request, res: Response) {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing body fields' })
        }
        try {
            const salt = await bcrypt.genSalt(Number(process.env.USER_SALT));
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const data = await service.createUser(name, email, hashedPassword);
            if (data?.data) {
                return res.status(200).json(data);
            }
            else {
                return res.status(404).json({ message: data.message });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error registering user",
                error: error,
            });
        }
    },

    /**
     * user.controller.login()
     * Attempts to login a User
     */
    login: async function (req: Request, res: Response) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing body fields' })
        }
        try {
            const data = await service.loginUser(email, password);
            return res.status(data.status).json({ message: data.message, data: data.data });
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error login in user",
                error: error,
            });
        }
    },
};