import  express  from "express";
import { addClient, getClient, getClientOne, updateClientOne, deleteClientOne } from "../controllers/clientController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
        .route('/')
        .post(checkAuth, addClient)
        .get(checkAuth, getClient);

router
        .route('/:id')
        .get(checkAuth, getClientOne )
        .put(checkAuth, updateClientOne)
        .delete(checkAuth, deleteClientOne)

export default router;