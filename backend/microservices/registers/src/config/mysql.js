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

export const existUser = async(correo) =>{
    
    const [rows] = await poolMysql.query(`
    SELECT ID
    FROM Usuario
    WHERE mail = '${correo}'`)
    const result = rows[0];
    
    return  !!result? true : false
}

export const createUser = async (user) => {

    const newUser = await poolMysql.query('INSERT INTO `Usuario` (`name`, `lastname`, `mail`, `pass`, `phone`, `IDrol`) VALUES (?, ?, ?, ?, ?, ?)', 
    [user.nombre, user.apellido, user.correo, user.pass, user.cel, 1]);
    return newUser
}