import bcrypt from 'bcryptjs';
import {existUser, createUser} from '../config/mysql.js'


export const registerUser  = async(req, res) => {
  try {
    const user = req.body
    console.log(user);
    const {correo} = user;

    const existe = await existUser(correo);
    if (existe){
        return res.status(400).json({ 
            success: false,
            message:"Email already use"
        });
    }
    
    if (!!user.pass) {
        user.pass = bcrypt.hashSync(user.pass, 10);
    }

    const resp = await createUser(user);
    res.json({
        success: true,
        msg: resp
    });

} catch (error) {
    console.error(error.message);
    return res.status(500).json({  
        success: false,
        message: error.message
    });
}
} 

export const ping = (req, res) => {
  return res.status(200).json({ msg: 'true' })
}
  
  