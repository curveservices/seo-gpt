async function generateText() {
    const prompt = document.getElementById('prompt').value;
    const maxTokens = parseInt(document.getElementById('maxTokens').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('/.netlify/functions/server/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                maxTokens: maxTokens,
                temperature: temperature
            })
        });

        const data = await response.json();
        responseDiv.innerText = `Generated Text: ${data.generatedText}`;
    } catch (error) {
        responseDiv.innerText = `Error: ${error.message}`;
    }
}
