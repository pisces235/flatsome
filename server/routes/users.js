const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController');

router.get('/', usersController.fetchAllUsers);
router.get('/:id', usersController.fetchUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.patch('/:id/restore', usersController.restoreUser);
router.delete('/:id/force', usersController.forceDeleteUser);

module.exports = router;
