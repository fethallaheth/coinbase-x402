import path from "path";

export function videoAccessHandler(req, res) {
  try {
    // Send the video content page
    res.sendFile(path.join(process.cwd(), "public", "video-content.html"));
  } catch (error) {
    res.status(500).send({
      error: "Failed to serve video content",
      message: error.message,
    });
  }
}