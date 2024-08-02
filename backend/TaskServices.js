const sql = require('mssql');

class TaskServices{

    constructor(pool)
    {
        this.pool = pool;
    }
    async retrieveData(userid){

        
        const result = await this.pool.request()
        .input("userid",sql.Int,userid)
        .query('select * from taskinfo where [userid] = @userid');
        return result;
    }

    async addTask(userid,title,description,date,duedate,status){

        const result = await this.pool.request()
            .input("userid",sql.Int,userid)
            .input("title",sql.VarChar,title)
            .input("description",sql.VarChar,description)
            .input("date",sql.Date,date)
            .input("duedate",sql.Date,duedate)
            .input("status",sql.VarChar,status)
            .query('insert into taskinfo ([userid],[title],[description],[date],[duedate],[status]) values(@userid,@title,@description,@date,@duedate,@status)')
        return result;
    }
    
    async updateStatus(id,status,userid){

        const result = await this.pool.request()
                        .input("status",sql.VarChar,status)
                        .input("id",sql.Int,id)
                        .input("userid",sql.Int,userid)
                        .query('update taskinfo set[status] = @status where [id] = @id and [userid] = @userid');
        return result;
    }

    async updateDelete(id,userid){

        const result = await this.pool.request()
                        .input("id", sql.Int, id)
                        .input("userid", sql.Int, userid)
                        .query('DELETE FROM taskinfo WHERE [id] = @id AND [userid] = @userid');
        return result;
    }

}
module.exports = TaskServices;