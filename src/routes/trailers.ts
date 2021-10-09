import { Router } from "express";
import * as trailersController from "../controllers/trailers";
let router = Router();

router.get("/", trailersController.getTrailer);
router.get("/:movieId", trailersController.youtubeSearch);
export default router;
