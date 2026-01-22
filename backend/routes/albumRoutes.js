import express from "express";
import { getAlbums, getAlbumTracks } from "../controllers/albumController.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id/tracks", getAlbumTracks);

export default router;
