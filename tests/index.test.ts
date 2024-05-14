import { closeDatabase, dbConnect } from "../src/functions/database/database.server";

process.env.mongoUri = "mongodb://127.0.0.1:27017/terraforming-mars";

describe('testing index file', () => {

  beforeAll(async () => {
    await dbConnect();
  })

  test('empty string should result in zero', async () => {
    expect(0).toBe(0);
  });

  afterAll(async () => {
    await closeDatabase();
  })
});