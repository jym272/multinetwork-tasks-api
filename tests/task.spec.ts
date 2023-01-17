import { test, expect } from '@playwright/test';

test.describe('routes: health', () => {
  test('get health route', async ({ request }) => {
    const response = await request.get('/health');
    const body = await response.body();

    expect(response.ok()).toBe(true);
    expect(body.toString()).toBe('OK');
    expect(response.status()).toBe(200);
  });
  test('get env route, compare PORT', async ({ request }) => {
    const response = await request.get('/env');
    const body = await response.body();
    // https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    const envObject = JSON.parse(body.toString()) as Record<string, string>;

    expect(envObject.PORT).toBe(process.env.PORT);
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);
  });
});