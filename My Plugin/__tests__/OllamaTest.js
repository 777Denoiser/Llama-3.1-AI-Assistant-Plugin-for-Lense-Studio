const fetch = require('node-fetch');

const apiKey = 'YOUR_API_KEY';
const prompt = 'Your prompt goes here';

async function generateText() {
  const response = await fetch(`https://api.llama.ai/v1/generate?api_key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      // other parameters...
    }),
  });

  const data = await response.json();
  // Process the response data
  console.log(data);
}

generateText();