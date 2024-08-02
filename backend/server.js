const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mssql');
const port = 5005;

const userController = require('./userController');
const authController = require('./authController');
const taskController = require('./taskController');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


const config = {
    user: 'charan',
    password: 'Naidu@269', 
    server: 'tedbbyua.database.windows.net', 
    database: 'config',
    options: {
        encrypt: true, 
        enableArithAbort: true
    }
};
let pool;

async function connectToDatabase() {
    try {
       
        pool = await sql.connect(config);
        console.log('Connected to Azure SQL Database');
       
        app.use('/user',userController(pool));
        app.use('/auth', authController(pool));
        app.use('/task', taskController(pool));
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}
connectToDatabase();


app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });
