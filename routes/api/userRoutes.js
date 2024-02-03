const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId')
.get(getSingleUser)
.update(updateUser)
.delete(deleteUser);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
