import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Custom GPT and SEO API');
});

// Endpoint for generating text with custom GPT
app.post('/generate', async (req, res) => {
    const { prompt, maxTokens, temperature } = req.body;
    const generatedText = `Generated text based on prompt: ${prompt}`;
    res.json({ generatedText });
});

// Function to make API requests to SEO Fast Audit
const fetchSeoData = async (endpoint, params) => {
    const apiKey = process.env.RAPIDAPI_KEY;
    const options = {
        method: 'GET',
        url: `https://seo-fast-audit.p.rapidapi.com${endpoint}`,
        params,
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'seo-fast-audit.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Endpoint for Scraper
app.get('/scraper', async (req, res) => {
    const { url, selector, attributes } = req.query;
    try {
        const data = await fetchSeoData('/scraper/b', { url, selector, attributes });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Web Shield Scanner
app.get('/web-shield', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/xss/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for SSL Cert Verify
app.get('/ssl-cert', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/https/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Robots.txt Checker
app.get('/robots', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/robots/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Sitemap Detector
app.get('/sitemap', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/sitemap/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for SEO Analysis
app.get('/seo-analysis', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/audit/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
