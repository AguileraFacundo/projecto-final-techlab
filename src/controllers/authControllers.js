import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../firebase.js'

export const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            "message": "Username, password, and email are required"});
    }
    try {
        const usersRef = db.collection("users")
        const snapshot = await usersRef.where("email", "==", email).get()
        if (!snapshot.empty) {
            return res.status(400).json({ "message": "email already exists" })
        }

        const hashedPassword = bcrypt.hashSync(password, 8)
        const userRef = await usersRef.add({
            email: email,
            password: hashedPassword,
            createAt: new Date()
        })

        const token = jwt.sign({id: userRef.id, email: email}, 
            process.env.JWT_SECRET, {expiresIn: "24h"})
        
        return res.status(201).json({
            "message": "User registered succesfully",
            token: token,
            userId: userRef.id
        })
    } catch (err) {
        return res.status(503).json({"message": err.message})
    }
}

export const login = async (req, res) => {
    const { email, password} = req.body;
    try {
        const usersRef = db.collection("users")
        const snapshot = await usersRef.where("email", "==", email).limit(1).get()
        if (snapshot.empty) {
            return res.status(401).json({ "message": "Invalid credentials" });
        }        
        
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();
        
        const isPasswordValid = await bcrypt.compare(password, userData.password)
        if (!isPasswordValid) {
            return res.status(401).json({ "message": "Invalid credentials"})
        }
        const token = jwt.sign({id: userDoc.id, email: userData.email}, process.env.JWT_SECRET, {expiresIn: "24h"})

        return res.status(200).json({
            "message": "success",
            "token": token
        })
    } catch (err) {
        return res.status(503).json({"error": err.message});
    }
}