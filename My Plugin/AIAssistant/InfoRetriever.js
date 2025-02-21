import { Networking } from 'My Plugin/AIAssistant/Networking';

class InfoRetriever {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async fetchData(query) {
        try {
            const response = await Networking.fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return this.formatResults(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
            return '';
        }
    }

    formatResults(results) {
        return results.slice(0, 3).map(r => `${r.title}: ${r.snippet}`).join('\n\n');
    }
}

export default InfoRetriever;