const supertest = require("supertest");

const server = require("./server.js");
const db = require("../data/db-config.js");

describe("server", () => {
    it("can run the tests", () => {
      expect(true).toBeTruthy();
    });
  
    describe("GET /", () => {
      it("should return http status code 200 OK", async () => {
        const res = await supertest(server)
            .get("/")
              expect(res.statusCode).toBe(200);
      });
    })

    describe("POST /api/auth/register", () => {
        it("should return status code 201, and a username", async () => {
            const res = await supertest(server)
            .post("/api/auth/register")
            .send({username:"ron",password:"abc"})
            expect(res.type).toBe('application/json')
            expect(res.statusCode).toBe(201)
            expect(res.body.username).toBe('ron')
        })
      })
    
    describe("POST /api/auth/login", () => {
        it("should return status code 200 and token", async () => {
            const res = await supertest(server)
            .post("/api/auth/login")
            .send({username:"ron",password:"abc"})
            expect(res.type).toBe('application/json')
            expect(res.statusCode).toBe(200)
            expect(res.body.token).toBeTruthy()
        });
    });
    describe("GET /api/jokes", () => {
        it("should return status code 201", async () => {
            const res = await supertest(server)
            console.log(res.body)
        });
    });
})