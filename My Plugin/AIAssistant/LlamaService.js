import { Networking } from 'My Plugin/AIAssistant/Networking';

class LlamaService {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async initialize() {
        // Check if the service is available
        const response = await this.makeRequest('/status');
        if (!response.ok) {
            throw new Error('Llama service is not available');
        }
    }

    async generateResponse(query, additionalInfo = '') {
        const response = await this.makeRequest('/generate', {
            method: 'POST',
            body: JSON.stringify({ query, additionalInfo })
        });

        if (!response.ok) {
            throw new Error('Failed to generate response');
        }

        return await response.json();
    }

    async makeRequest(path, options = {}) {
        const url = this.apiEndpoint + path;
        return await Networking.fetch(url, options);
    }
}

export default LlamaService;