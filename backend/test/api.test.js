import axios from 'axios';
import assert from 'assert';

describe('Tests - Fruityvice API', () => {
  it('Status 200 for /api/fruit/apple', async () => {
    const response = await axios.get('https://fruityvice.com/api/fruit/apple');
    assert.strictEqual(response.status, 200);
  });

  it('Status 200 for /api/fruit/banana', async () => {
    const response = await axios.get('https://fruityvice.com/api/fruit/banana');
    assert.strictEqual(response.status, 200);
  });

  it('Status 200 for /api/fruit/all', async () => {
    const response = await axios.get('https://fruityvice.com/api/fruit/all');
    assert.strictEqual(response.status, 200);
  });

  it('Status 404 for non-existent endpoint', async () => {
    try {
      await axios.get('https://fruityvice.com/api/fruit/nonexistent');
    } catch (error) {
      assert.strictEqual(error.response.status, 404);
    }
  });
});
