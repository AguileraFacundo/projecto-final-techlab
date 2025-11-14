import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { checkEmail, createEmail, getEmail } from '../repositories/auth.js'

export const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            "status": "fail",
            "message": "email and password are required"
        });
    }
    try {
        const check = await checkEmail(email)
        
        if (!check.empty) {
            return res.status(400).json({ 
                "status": "fail",
                "message": "email already exists" 
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 8)
        
        const user = await createEmail(email, hashedPassword)

        const token = jwt.sign({id: user.id, email: email}, 
            process.env.JWT_SECRET, {expiresIn: "24h"})
        
        return res.status(201).json({
            "status": "success",
            "message": "User registered succesfully",
            token: token,
            userId: user.id
        })
    } catch (err) {
        return res.status(503).json({
            "status": "fail",
            "message": err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password} = req.body;
    try {
        const check = await getEmail(email)
        if (check.empty) {
            return res.status(401).json({ 
                "status": "fail",
                "message": "Invalid credentials" 
            });
        }        
        
        const userDoc = check.docs[0];
        const userData = userDoc.data();
        
        const isPasswordValid = await bcrypt.compare(password, userData.password)
        if (!isPasswordValid) {
            return res.status(401).json({ 
                "status": "fail",
                "message": "Invalid credentials"
            })
        }
        const token = jwt.sign({id: userDoc.id, email: userData.email}, process.env.JWT_SECRET, {expiresIn: "24h"})

        return res.status(200).json({
            "status": "success",
            "message": "",
            "token": token
        })
    } catch (err) {
        return res.status(503).json({"error": err.message});
    }
}