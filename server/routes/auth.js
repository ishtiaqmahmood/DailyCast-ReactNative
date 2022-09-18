import express from 'express';

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  uploadImage,
} = require('../controllers/auth');

router.get('/', (req, res) => {
  return res.json({
    data: 'hello world from kaloraat auth API',
  });
});
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/update-image', requireSignin, uploadImage);

export default router;
