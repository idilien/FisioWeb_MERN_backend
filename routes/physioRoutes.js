import  express  from "express";
import { 
        profile, 
        register,
        confirm,
        auth, 
        forgetPassword, 
        checkToken, 
        newPassword, 
        updateProfile
    } from "../controllers/physioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Public
router.post('/', register);
router.get('/confirm/:token', confirm);
router.post('/login', auth);
router.post('/forget-password', forgetPassword);

router.route('/forget-password/:token').get(checkToken).post(newPassword);

//Private
router.get('/profile', checkAuth, profile);
router.put('/profile/:id', checkAuth, updateProfile);


export default router;