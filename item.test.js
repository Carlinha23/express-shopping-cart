process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let pickles = { name: "Pickles" };

beforeEach(function() {
  items.push(pickles);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

/** GET /cats - returns `{cats: [cat, ...]}` */

describe("GET /items",() => {
    test("Gets all items", async () => {
      const resp = await request(app).get("/items");
      expect(resp.statusCode).toBe(200);
  
   
    });
  });