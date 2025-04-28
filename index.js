const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ success: false, message: 'TikTok URL is required' });
    }

    try {
        const response = await axios.get(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
        const data = response.data;

        if (data && data.success) {
            res.json({
                success: true,
                downloadUrl: data.video_no_watermark
            });
        } else {
            res.json({ success: false, message: 'Failed to download video' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.send('TikTok Downloader API is running');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
