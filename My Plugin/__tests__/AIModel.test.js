const AIModel = require('../AIAssistant/AIModel');

jest.mock('@llama-node/llama-cpp');

describe('AIModel', () => {
  let aiModel;

  beforeEach(() => {
    aiModel = new AIModel();
  });

  test('model initialization', async () => {
    await aiModel.loadModel();
    expect(aiModel.model).not.toBeNull();
    expect(aiModel.tokenizer).not.toBeNull();
  });

  test('generate response', async () => {
    await aiModel.loadModel();
    const query = "What is the capital of France?";
    const response = await aiModel.generateResponse(query);
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
    expect(response).toContain("Paris");
  });

  test('generate response with context', async () => {
    await aiModel.loadModel();
    const query = "Tell me more about this city";
    const context = "Paris is the capital of France.";
    const response = await aiModel.generateResponse(query, context);
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
    expect(response).toMatch(/Paris|France/);
  });

  test('model error handling', async () => {
    await expect(aiModel.generateResponse("Test query")).rejects.toThrow();
  });
});
