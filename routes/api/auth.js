import express from 'express';
const router = express.Router();
import authCtrl from '../route_controllers/auth.controller.js'

router.route('/signup')
  .post(authCtrl.signup)
router.route('/signin')
  .post(authCtrl.signin)
router.route('/signout')
  .get(authCtrl.signout)

export default router;