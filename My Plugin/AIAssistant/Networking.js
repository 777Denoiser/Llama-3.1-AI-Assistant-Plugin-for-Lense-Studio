import { Networking } from 'My Plugin/AIAssistant/Networking';

class InfoRetriever {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async fetchInfo(query) {
        const response = await Networking.fetch(this.apiEndpoint, {
            method: 'POST',
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch additional information');
        }

        return await response.json();
    }
}

export default InfoRetriever;