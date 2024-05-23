import { prepareEnv } from "./loadTests";
import getCorporationFixtures from "../src/fixtures/corporations.fixtures";
import getTileFixtures from "../src/fixtures/tiles.fixtures";

describe('fixtures test', () => {
  beforeAll(() => {
    //prepare env
    prepareEnv();
  })

  test('corporations', () => {
    expect(getCorporationFixtures).not.toThrow();
  });

  test('tiles', () => {
    expect(getTileFixtures).not.toThrow();
  });



})