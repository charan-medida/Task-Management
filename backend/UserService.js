const sql = require('mssql');
const jwt = require('jsonwebtoken');


class UserService {
    constructor(pool) {
        this.pool = pool;
    }

    async registerUser(username, password, email) {
        
        const result = await this.pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM information WHERE [username] = @username');
        
        if (result.recordset.length > 0) {
            return { flow: true };
        } else {
            const result = await this.pool.request()
                .input('username', sql.VarChar, username)
                .input('password', sql.VarChar, password)
                .input('email', sql.VarChar, email)
                .query('INSERT INTO information ([username], [email], [password]) VALUES (@username, @email, @password)');
                return {
                    flow: false,
                    id: result.recordset 
                };
        }
    }


}

module.exports = UserService;
