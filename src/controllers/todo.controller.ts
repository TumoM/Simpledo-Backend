import { Request, Response } from "express";
const service = require('../services/todo.service');
// require("dotenv").config();

/**
 * todo.controller.ts
 *
 * @description :: Server-side logic for managing todos.
 */
export default {
    /**
     * todo.controller.list()
     * Lists all users in the DB
     */
    list: async function (req: Request, res: Response) {
        try {
            const data = await service.getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error fetching todos",
                error: error,
            });
        }
    },

    /**
     * todo.controller.show()
     * Gets a todo via their ID
     */
    show: async function (req: Request, res: Response) {
        const id = req.params.id;

        try {
            const data = await service.getById(id);

            if (data?.data) {
                return res.status(200).json(data);
            }
            else {
                return res.status(404).json({ message: 'No todo found' });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error fetching todo",
                error: error,
            });
        }

    },

    /**
     * todo.controller.show()
     * Gets a todo via their ID
     */
    getUserTodos: async function (req: Request, res: Response) {
        const userId = req.params.userId;

        try {
            const data = await service.getAllByUserId(userId);

            if (data?.data) {

                return res.status(200).json(data);
            }
            else {
                return res.status(404).json({ message: 'No todo found' });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error fetching User's Todos",
                error: error,
            });
        }

    },

    /**
     * todo.controller.create()
     * Creates new todo in the Todo Table
     */
    create: async function (req: Request, res: Response) {
        const { userId, title } = req.body
        if (!userId || !title) {
            return res.status(400).json({ message: 'Missing body fields' })
        }
        try {
            const data = await service.createTodo(userId, title);

            if (data?.data) {
                return res.status(200).json(data);
            }
            else {
                return res.status(404).json({ message: data.message });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error creating todo",
                error: error,
            });
        }
    },

    /**
     * todo.controller.setCompleted()
     * Sets todo to complete
     */
    setCompleted: async function (req: Request, res: Response) {
        const { userId } = req.body
        const id = req.params.id
        if (!userId) {
            return res.status(400).json({ message: 'Missing body fields' })
        }
        try {
            const data = await service.updateStatus(id, userId, 'complete');

            if (data?.data) {
                if (data.data[0] == 0) { res.status(400).json({ message: 'No records updated' }) }
                else {
                    return res.status(200).json({ message: 'Record updated' });
                }
            }
            else {
                return res.status(404).json({ message: data.message });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error updating todo",
                error: error,
            });
        }
    },

    /**
     * todo.controller.setUncompleted()
     * Sets todo to incomplete
     */
    setUncompleted: async function (req: Request, res: Response) {
        const { userId } = req.body
        const id = req.params.id
        if (!userId) {
            return res.status(400).json({ message: 'Missing body fields' })
        }
        try {
            const data = await service.updateStatus(id, userId, 'incomplete');
            if (data?.data) {
                if (data.data[0] == 0) { res.status(400).json({ message: 'No records updated' }) }
                else {
                    return res.status(200).json({ message: 'Record updated' });
                }
            }
            else {
                return res.status(404).json({ message: data.message });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error updating todo",
                error: error,
            });
        }
    },

    /**
    * todo.controller.remove()
    * Deletes a Todo
    */
    remove: async function (req: Request, res: Response) {
        const id = req.params.id;

        try {
            const data = await service.deleteById(id);

            if (data?.data) {

                return res.status(200).json(data);
            }
            else {
                console.log('No Data');
                return res.status(404).json({ message: 'No todo found' });

            }
        } catch (error) {
            console.log('error in controller:', error)
            return res.status(500).json({
                message: "Error deleting todo",
                error: error,
            });
        }
    },
};