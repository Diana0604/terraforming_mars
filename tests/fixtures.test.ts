import { prepareEnv } from "./loadTests";
import getCorporationFixtures from "../src/fixtures/corporations.fixtures";

describe('functions', () => {
  beforeAll(() => {
    //prepare env
    prepareEnv();
  })

  test('corporations', () => {
    
    expect(getCorporationFixtures).not.toThrow();

  })


})