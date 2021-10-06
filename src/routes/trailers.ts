import { Router } from "express";
import * as trailersController from "../controllers/trailers";
let router = Router();

router.get("/", trailersController.getTrailer);

export default router;
