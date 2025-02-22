const AIAssistantPlugin = require('../AIAssistant/AIAssistantPlugin');

jest.mock('../AIAssistant/AIModel');
jest.mock('../AIAssistant/InfoRetriever');
jest.mock('../AIAssistant/UI');
jest.mock('../AIAssistant/Cache');

describe('AIAssistantPlugin', () => {
  let plugin;

  beforeEach(() => {
    plugin = new AIAssistantPlugin();
  });

  test('plugin initialization', () => {
    expect(plugin.aiModel).toBeDefined();
    expect(plugin.webScraper).toBeDefined();
    expect(plugin.cache).toBeDefined();
    expect(plugin.ui).toBeDefined();
  });

  test('handle query', async () => {
    plugin.aiModel.generateResponse = jest.fn().mockResolvedValue("Mock AI response");
    plugin.webScraper.fetchData = jest.fn().mockResolvedValue("Mock web data");

    const response = await plugin.handleQuery("Test query");
    expect(response).toBe("Mock AI response");

    // Test caching
    const cachedResponse = await plugin.handleQuery("Test query");
    expect(cachedResponse).toBe(response);
    expect(plugin.aiModel.generateResponse).toHaveBeenCalledTimes(1);
  });

  test('plugin initialization', async () => {
    plugin.aiModel.loadModel = jest.fn().mockResolvedValue();
    plugin.ui.createInterface = jest.fn();

    await plugin.initialize();
    expect(plugin.aiModel.loadModel).toHaveBeenCalled();
    expect(plugin.ui.createInterface).toHaveBeenCalled();
  });
});
