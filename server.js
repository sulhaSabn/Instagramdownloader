const express = require("express");
const cors = require("cors");
const instagramGetUrl = require("instagram-url-direct");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Instagram URL required"
      });
    }

    const data = await instagramGetUrl(url);

    res.json({
      success: true,
      media: data.url_list
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
