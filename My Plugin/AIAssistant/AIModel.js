const { LlamaTokenizer, LlamaModel } = require('@llama-node/llama-cpp');

class AIModel {
    constructor() {
        this.model = null;
        this.tokenizer = null;
    }

    async loadModel() {
        try {
            this.model = await LlamaModel.load('path/to/llama_3.1_model.bin');
            this.tokenizer = new LlamaTokenizer();
        } catch (error) {
            console.error('Error loading Llama 3.1 model:', error);
        }
    }

    async generateResponse(query, additionalContext = '') {
        if (!this.model || !this.tokenizer) {
            throw new Error('Model not loaded');
        }

        const input = `${query}\n${additionalContext}`.trim();
        const tokens = this.tokenizer.encode(input);
        const output = await this.model.generate(tokens, {
            maxTokens: 100,
            temperature: 0.7,
            topP: 0.9,
        });

        return this.tokenizer.decode(output);
    }
}

module.exports = AIModel;
