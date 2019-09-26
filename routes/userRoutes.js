const router = require('express').Router();
const passport = require('../utils/middleware/passport-local');
const userController = require('../controllers/userController');

// matches with '/api/users'
router
  .route('/api/users')
  .get(userController.findAll);

router
  .route('/register')
  .get((req, res) => res.render("register"))
  .post(userController.register);

router
  .route('/status')
  .get(userController.userCheck);

router
  .route('/login')
  .get((req, res) => res.render("login"))
  .post(passport.authenticate('local'), userController.login);

router
  .route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router
  .route('/api/:username')
  .get(userController.findByName)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
