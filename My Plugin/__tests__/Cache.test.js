const Cache = require('../AIAssistant/Cache');

describe('Cache', () => {
  let cache;

  beforeEach(() => {
    cache = new Cache();
  });

  test('set and get', () => {
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  test('max size', () => {
    for (let i = 0; i < 101; i++) {
      cache.set(`key${i}`, `value${i}`);
    }

    expect(cache.cache.size).toBeLessThanOrEqual(100);
    expect(cache.get("key0")).toBeUndefined();
    expect(cache.get("key100")).toBe("new_value100");
  });

  test('overwrite', () => {
    cache.set("key1", "value1");
    cache.set("key1", "new_value1");
    expect(cache.get("key1")).toBe("new_value1");
  });
});
