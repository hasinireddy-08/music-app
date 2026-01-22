import Album from "../models/Album.js";
import Track from "../models/Track.js";

export const getAlbums = async (req, res) => {
  const albums = await Album.find()
    .populate("artist", "name")
    .sort({ createdAt: -1 });

  res.json(albums);
};

export const getAlbumTracks = async (req, res) => {
  const tracks = await Track.find({ album: req.params.id })
    .populate("artist", "name")
    .populate("album", "title")
    .sort({ createdAt: -1 });

  res.json(tracks);
};
