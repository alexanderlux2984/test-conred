import jwt from 'jsonwebtoken'
import fs from 'fs'
import bcrypt from 'bcryptjs';
import {getUser} from '../config/mysql.js'
import dotenv from 'dotenv'
dotenv.config();

export const login = async (req, res) => {
    
    try {
        const user = req.body
        console.log(user);
        const {tipo, correo, pass} = user;

        const resp = await getUser(correo, tipo);
        console.log(resp);
        if (!resp.ID){
            return res.status(400).json({ 
                success: false,
                message:"El usuario no existe"
            });
        }
        
        const validatePassword =  !pass || !resp.password? false : bcrypt.compareSync(pass, resp.password);
        if (!validatePassword){
            return res.status(400).json({ 
                success: false,
                message:"authentication fail"
            });
        }

        const accesToken = createAccessToken(resp.ID, correo, tipo);

        return res.status(200).json({ 
            success: true,
            tipo,
            accesToken
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({  
            success: false,
            message: error.message
        });
    }

}

const createAccessToken = (ID, mail, IDrol) => {
    const privateKey = fs.readFileSync(process.env.JWT_SECRET, 'utf-8');
    const payload = {
        ID,
        mail,
        IDrol
    }
    
    const signOption = {
        issuer : 'conred',
        subject: 'prod',
        audience: 'rrhh',
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'RS256'
    }
    return jwt.sign(payload, privateKey, signOption)
}

export const ping = (req, res) => {
    try {
        
        console.log('Healthy')
        return res.status(200).json({ msg: 'true' })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ error: error.message })
    }
}