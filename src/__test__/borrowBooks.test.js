const request = require("supertest");
const app = require("../../index");

describe("Member Borrow Book", () => {
  it("should allow a member to borrow a book if conditions are met", async () => {
    const res = await request(app).post("/api/members/borrow").send({
      memberCode: "M001",
      bookCode: "JK-45",
    });

    expect(res.body.status).toBe(200);
    expect(res.body.msg).toBe(
      "Book Harry Potter borrowed successfully by member Angga"
    );
  });

  it("should not allow a member to borrow more than 2 books", async () => {
    await request(app).post("/api/members/borrow").send({
      memberCode: "M002",
      bookCode: "SHR-1",
    });
    await request(app).post("/api/members/borrow").send({
      memberCode: "M002",
      bookCode: "TW-11",
    });
    const res = await request(app).post("/api/members/borrow").send({
      memberCode: "M002",
      bookCode: "JK-45",
    });

    expect(res.body.status).toBe(400);
    expect(res.body.msg).toBe("Member cannot borrow more than 2 books");
  });

  it("should return error if the book is not available", async () => {
    const res = await request(app).post("/api/members/borrow").send({
      memberCode: "M001",
      bookCode: "TW-11",
    });

    expect(res.body.status).toBe(400);
    expect(res.body.msg).toBe("Book stock not available");
  });
});
