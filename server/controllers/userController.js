const User = require('../models/User');

module.exports = class userController {
    // [GET] fetch all users
    static async fetchAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    // [GET] fetch user by id
    static async fetchUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    // [POST] create a user
    static async createUser(req, res) {
        const user = req.body;
        try {
            await User.create(user);
            res.status(201).json({message: 'user created successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    //[PUT] update a user
    static async updateUser(req, res) {
        
    }
    //[PATCH] update a user
    static async restoreUser(req, res) {
        try {
            const user = await User.restore({ _id: req.params.id });
            res.status(201).json({message: 'user restored successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    //[DETETE] trash a user
    static async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const user = await User.delete({ _id: id });
            res.status(201).json({message: 'user deleted successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    //[DETETE] force trash a user
    static async forceDeleteUser(req, res) {
        const id = req.params.id;
        try {
            const user = await User.deleteOne({ _id: id });
            res.status(201).json({message: 'user deleted successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}
