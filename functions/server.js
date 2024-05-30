const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Custom GPT and SEO API');
});

app.post('/generate', async (req, res) => {
    const { prompt, maxTokens, temperature } = req.body;
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const openAiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const response = await axios.post(openAiEndpoint, {
            prompt,
            max_tokens: maxTokens,
            temperature
        }, {
            headers: {
                'Authorization': `Bearer ${openAiApiKey}`
            }
        });

        const generatedText = response.data.choices[0].text;
        res.json({ generatedText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

app.get('/scraper', async (req, res) => {
    const { url, selector, attributes } = req.query;
    try {
        const data = await fetchSeoData('/scraper/b', { url, selector, attributes });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/web-shield', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/xss/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/ssl-cert', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/https/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/robots', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/robots/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/sitemap', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/sitemap/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/seo-analysis', async (req, res) => {
    const { url } = req.query;
    try {
        const data = await fetchSeoData('/audit/b', { url });
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports.handler = serverless(app);


