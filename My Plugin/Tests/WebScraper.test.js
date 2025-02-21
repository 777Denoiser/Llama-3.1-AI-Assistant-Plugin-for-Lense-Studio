const WebScraper = require('../AIAssistant/InfoRetriever');
const axios = require('axios');

jest.mock('axios');

describe('WebScraper', () => {
  let webScraper;

  beforeEach(() => {
    webScraper = new WebScraper();
  });

  test('fetch data', async () => {
    axios.get.mockResolvedValue({
      data: '<html><body><div class="g"><div class="r">Python</div><div class="s">Programming language</div></div></body></html>'
    });

    const query = "Python programming";
    const result = await webScraper.fetchData(query);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("Python");
  });

  test('fetch data with empty query', async () => {
    const query = "";
    const result = await webScraper.fetchData(query);
    expect(result).toBe("");
  });

  test('fetch data error handling', async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const query = "Test query";
    const result = await webScraper.fetchData(query);
    expect(result).toBe("");
  });
});
