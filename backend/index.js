const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const upload = multer({ storage: multer.memoryStorage() });
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiRouter = express.Router();

apiRouter.post("/convert", upload.single("image"), async (req, res) => {
    try {
        const format = req.body.format;
        const output = await sharp(req.file.buffer).toFormat(format).toBuffer();
        const filename = `converted_image.${format}`;
        res.set("Content-Type", `image/${format}`);
        res.send(output);
    } catch (error) {
        console.error("Error processing image:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
