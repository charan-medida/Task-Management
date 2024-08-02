const sql = require('mssql');
const jwt = require('jsonwebtoken');

class Authentication{

    constructor(pool){
        this.pool = pool;
    }

    async loginUser(username, password) {
        
        try {  
            const result = await this.pool.request()
                .input('username', sql.VarChar, username)
                .query('SELECT * FROM information WHERE [username] = @username');
            
            if (result.recordset.length === 0) {
                console.log('no record');
                throw new Error('Invalid Credentials');
            }
            const user = result.recordset[0];
            
            if(user.password !== password)
                throw new Error('Invalid Credentials');
            
            const payload = { username: user.username, userid: user.userid };
            console.log(user.username,user.userid);
            const token = jwt.sign(payload, 'b4b3d4e3-dc1e-4eb7-a8f6-1b18c6c69c4b', { expiresIn: '10h' });
    
            return { token };
        } catch (error) {
            console.error('UserService loginUser error:', error.message);
            throw error; 
        }
    }
     async authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token)
            res.sendStatus(401);

        jwt.verify(token,'b4b3d4e3-dc1e-4eb7-a8f6-1b18c6c69c4b',(err,payload) => {
            if(err)

                return res.sendStatus(403);
            req.payload = payload;
            next();
        });
    }
}

module.exports = Authentication;