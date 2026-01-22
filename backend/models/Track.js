import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album", default: null },

    fileUrl: { type: String, required: true },
    duration: { type: Number, default: 0 },

    favorite: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Track", trackSchema);
