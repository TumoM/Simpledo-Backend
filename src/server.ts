import app from './app';
require("dotenv").config();

const port: number = process.env.port as unknown as number || 4000

app.listen(port, () => {
    console.log('Server running on: http://localhost:' + port)
});