import LlamaService from './LlamaService';
import InfoRetriever from './InfoRetriever';
import UI from './UI';
import Cache from './Cache';
import Config from './Config';

class AIAssistantPlugin {
    constructor() {
        this.llamaService = new LlamaService(Config.llamaApiEndpoint);
        this.infoRetriever = new InfoRetriever(Config.infoApiEndpoint);
        this.cache = new Cache(Config.cacheSize);
        this.ui = new UI(this.handleQuery.bind(this));
    }

    async initialize() {
        try {
            this.ui.showLoadingState('Initializing plugin...');
            await this.llamaService.initialize();
            this.ui.createInterface();
        } catch (error) {
            console.error('Initialization error:', error);
            this.ui.showError('Failed to initialize. Please check your internet connection and try again.');
        }
    }

    async handleQuery(query) {
        try {
            this.ui.showLoadingState('Processing query...');
            let response = this.cache.get(query);
            if (!response) {
                response = await this.llamaService.generateResponse(query);
                if (response.needsMoreInfo) {
                    const additionalInfo = await this.infoRetriever.fetchInfo(query);
                    response = await this.llamaService.generateResponse(query, additionalInfo);
                }
                this.cache.set(query, response);
            }
            return response.text;
        } catch (error) {
            console.error('Error handling query:', error);
            return 'Sorry, I encountered an error. Please try again.';
        } finally {
            this.ui.hideLoadingState();
        }
    }
}

export default new AIAssistantPlugin();