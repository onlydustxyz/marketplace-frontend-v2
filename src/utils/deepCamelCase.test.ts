import { describe, expect, it } from "vitest";
import { deepCamelCase } from "./deepCamelCase";

describe("deepCamelCase", () => {
  it("should camelize all keys", () => {
    const testValue = {
      hello_cous_cous: {
        "hello-cous-cous": { HelloCousCous: 1 },
      },
      helloOnlyDust: 1,
    };

    const camelizedDict = deepCamelCase(testValue);

    expect(camelizedDict.helloCousCous.helloCousCous.helloCousCous).toBe(1);
    expect(camelizedDict.helloOnlyDust).toBe(1);
  });

  it("should return value as is if not an object", () => {
    expect(deepCamelCase(1)).toBe(1);
    expect(deepCamelCase(false)).toBe(false);
    expect(deepCamelCase("")).toBe("");
    expect(deepCamelCase(null)).toBe(null);
    expect(deepCamelCase(undefined)).toBe(undefined);
    expect(deepCamelCase("toto")).toBe("toto");
  });
});
