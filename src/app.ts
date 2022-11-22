import express from 'express';
import cors from "cors"

import indexRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(
            express.urlencoded({
                extended: true,
            })
        );
        this.server.use(cors())

    }

    routes() {
        this.server.use('/', indexRoutes);
        this.server.use('/user', userRoutes);
    }
}

export default new App().server;