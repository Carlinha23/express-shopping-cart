process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let pickles = { name: "Pickles" };

beforeEach(function() {
  items.push(pickles);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});


describe("GET /items",() => {
    test("Gets all items", async () => {
      const resp = await request(app).get("/items");
      expect(resp.statusCode).toBe(200);
    });
  });


describe("GET /items/:name",() => {
    test("Get item by name", async () => {
      const resp = await request(app).get(`/items/${pickles.name}`);
      expect(resp.statusCode).toBe(404);
    });
  });


describe("POST /items",() => {
    test("Creates a new item", async () => {
      const resp = await request(app)
        .post("/items")
        .send({
          name: "Ezra"
        });
      expect(resp.statusCode).toBe(201);
    });
  });


describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
      const resp = await request(app)
        .patch("/items/${pickles.name}")
        .send({
          name: "Troll"
        });
      expect(resp.statusCode).toBe(404);
      
    });
  
    test("Responds with 404 if name invalid", async function() {
      const resp = await request(app).patch(`/items/${pickles.name}`);
      expect(resp.statusCode).toBe(404);
    });
  });


describe("DELETE /items/:name", function() {
    test("Deletes a single a item", async function() {
      const resp = await request(app).delete(`/items/${pickles.name}`);
      expect(resp.statusCode).toBe(404);
    });
    test("Responds with 404 for deleting invalid item", async function() {
        const resp = await request(app).delete(`/items/${pickles.name}`);
        expect(resp.statusCode).toBe(404);
      });
  });
