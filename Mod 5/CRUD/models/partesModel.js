var pool = require('./bd');

async function getPartes(){
    var query = 'select * from partes';
    var rows = await pool.query(query);
    return rows; 
}

async function deletePartesById(id){
    var query = 'delete from partes where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertPartes(obj){
    try {
        var query = "insert into partes set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPartesById(id) {
    var query = "select * from partes where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function editarPartesById(obj, id) {
    try{
        var query = "update partes set ? where id = ? ";
        var rows = await pool.query(query, [obj,id]);
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {getPartes, deletePartesById, insertPartes, getPartesById, editarPartesById}
