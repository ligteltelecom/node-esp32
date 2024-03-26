import { Router } from "express";
import * as mainController from "../controllers/mainController";


const router = Router();

router.get('/ping', mainController.ping);
router.get('/time', mainController.time);
router.get('/version', mainController.version);
router.get('/update/:api_key', mainController.update);

export default router;