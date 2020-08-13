const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };
let cookie = { name: "cookie", price: 1.25 };
let wef = { name: "wef", price: 2.45 };

beforeEach(function() {
  db.items = [];
  db.items.push(popsicle, cookie, wef);
});

// make a test for a route that doesn't exist

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({items: [
      { name: "popsicle", price: 1.45 },
      { name: "cookie", price: 1.25 },
      { name: "wef", price: 2.45 }
    ]})
  }
)})

describe("POST /items", function() {
  it("Posts an item to items", async function() {
    const resp = await request(app)
      .post("/items")
      .send({ name: "wef2", price: 4.45 });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({'added': { name: "wef2", price: 4.45 }});
  }
)})

describe("GET /items/:name", function() {
  it("Gets an item in items", async function() {
    const resp = await request(app).get("/items/wef");

    expect(resp.body).toEqual({ name: "wef", price: 2.45 })
  }
)})

describe("PATCH /items/:name", function() {
  it("Updates an item in items", async function() {
    const resp = await request(app)
      .patch("/items/wef")
      .send({ name: "wef3", price: 8.45 });

    expect(resp.body).toEqual({"updated": { name: "wef3", price: 8.45 }});
  });
  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
})

describe("DELETE /items/:name", function() {
  it("Deletes a single a item", async function() {
    const resp = await request(app)
      .delete(`/items/${popsicle.name}`);
    expect(resp.body).toEqual({ message: "deleted" });
    expect(db.items.length).toEqual(2);
  });
});
