import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  uploadTrack,
  getTracks,
  getTrackById,
  toggleFavorite,
  getFavorites
} from "../controllers/trackController.js";

const router = express.Router();

router.get("/", getTracks);
router.get("/favorites", getFavorites);
router.get("/:id", getTrackById);

router.post("/upload", upload.single("audio"), uploadTrack);
router.patch("/:id/favorite", toggleFavorite);

export default router;
