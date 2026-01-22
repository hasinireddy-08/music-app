import Track from "../models/Track.js";
import Artist from "../models/Artist.js";
import Album from "../models/Album.js";

// ✅ Upload Track
export const uploadTrack = async (req, res) => {
  const { name, artistName, albumTitle, duration } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Audio file is required");
  }

  // artist
  let artist = await Artist.findOne({ name: artistName || "Unknown Artist" });
  if (!artist) {
    artist = await Artist.create({ name: artistName || "Unknown Artist" });
  }

  // album (optional)
  let album = null;
  if (albumTitle && albumTitle.trim() !== "") {
    album = await Album.findOne({ title: albumTitle, artist: artist._id });
    if (!album) {
      album = await Album.create({ title: albumTitle, artist: artist._id });
    }
  }

  const fileUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  const track = await Track.create({
    name: name || req.file.originalname,
    artist: artist._id,
    album: album ? album._id : null,
    fileUrl,
    duration: duration ? Number(duration) : 0
  });

  res.status(201).json(track);
};

// ✅ Get All Tracks
export const getTracks = async (req, res) => {
  const tracks = await Track.find()
    .populate("artist", "name")
    .populate("album", "title")
    .sort({ createdAt: -1 });

  res.json(tracks);
};

// ✅ Play Track (return track meta)
export const getTrackById = async (req, res) => {
  const track = await Track.findById(req.params.id)
    .populate("artist", "name")
    .populate("album", "title");

  if (!track) {
    res.status(404);
    throw new Error("Track not found");
  }

  res.json(track);
};

// ✅ Toggle Favorite
export const toggleFavorite = async (req, res) => {
  const track = await Track.findById(req.params.id);
  if (!track) {
    res.status(404);
    throw new Error("Track not found");
  }

  track.favorite = !track.favorite;
  await track.save();

  res.json({ id: track._id, favorite: track.favorite });
};

// ✅ Get Favorites
export const getFavorites = async (req, res) => {
  const tracks = await Track.find({ favorite: true })
    .populate("artist", "name")
    .populate("album", "title")
    .sort({ createdAt: -1 });

  res.json(tracks);
};
