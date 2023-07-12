import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const option = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
}
console.log(option);

export const poolMysql = mysql.createPool(option).promise();

export const getUser = async(correo, tipo) =>{
    
    const [rows] = await poolMysql.query(`
    SELECT ID, name, pass
    FROM Usuario
    WHERE mail = '${correo}' and IDrol = ${tipo}`)
    const result = rows[0];
    
    return  !!result? {
        ID: result.ID, 
        name: result.name, 
        password: result.pass
    } : {}
}


