import { Router } from "express";

let router = Router();

router.get("/", (req, res) => {
  res.send({
    msg: "all trailer",
  });
});

export default router;
