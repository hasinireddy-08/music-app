import Artist from "../models/Artist.js";
import Track from "../models/Track.js";

export const getArtists = async (req, res) => {
  const artists = await Artist.find().sort({ name: 1 });
  res.json(artists);
};

export const getArtistTracks = async (req, res) => {
  const tracks = await Track.find({ artist: req.params.id })
    .populate("artist", "name")
    .populate("album", "title")
    .sort({ createdAt: -1 });

  res.json(tracks);
};
