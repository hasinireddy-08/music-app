import express from "express";
import { getArtists, getArtistTracks } from "../controllers/artistController.js";

const router = express.Router();

router.get("/", getArtists);
router.get("/:id/tracks", getArtistTracks);

export default router;
