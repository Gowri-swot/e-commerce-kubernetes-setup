const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 7070;
const User = require("../database-service/User");
const jwt = require("jsonwebtoken");
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findAll({ where: {email : email} });
    if (user.length == 0) {
        res.statusMessage = "Bad Request"
        return res.json({ message: "User doesn't exist" });
    } else {
        if (password !== user[0].password) {
            res.statusMessage = "Bad Request"
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user[0].name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
});

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    const userExists = await User.findAll({ where : {email: email} })
    if (userExists.length > 0) {
        res.statusMessage = "Bad Request"
        return res.json({ message: "User already exists" });
    } else {
        const newUser = new User({
            email,
            name,
            password,
        });
        newUser.save();
        return res.json(newUser);
    }
});

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});


