import json2table from "../src/lib/json2table.js";

test("json to table format ok", () => {
  const table = json2table({ hoge: "hoge" });
  expect(table.table.length).toBeGreaterThan(0);
});
