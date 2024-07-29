
const User = require('../models/User');

class UserController{

    async login(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username, password: req.body.password });
            if (!user) {
                return res.status(404).json("Wrong Email or Password!");
            }

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async register(req, res) {
        try {
            const userInfor = req.body;

            if (!userInfor.username || !userInfor.password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newUser = new User(userInfor);
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new UserController();