const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const ISSUE_FIELDS = [
  "_id",
  "assigned_to",
  "issue_title",
  "issue_title",
  "created_on",
  "created_by",
  "updated_on",
  "open",
];

const request = () => chai.request(server).keepOpen();

suite("Functional Tests", function () {
  suite("Create issues", () => {
    test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
      done();
    });

    test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
      done();
    });

    test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
      done();
    });
  });

  suite("View issues", () => {
    test("View issues on a project: GET request to /api/issues/{project}", (done) => {
      request()
        .get("/api/issues/test")
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            const issue = res.body[0];
            ISSUE_FIELDS.forEach((p) => assert.property(issue, p));
          }
          done();
        });
    });

    test("View issues on a project with one filter: GET request to /api/issues/{project}", (done) => {
      request()
        .get("/api/issues/test?open=true")
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            const length = res.body.length > 100 ? 100 : res.body.length;
            for (let i = 0; i < length; i++) {
              const issue = res.body[i];
              ISSUE_FIELDS.forEach((p) => assert.property(issue, p));
              assert.isTrue(issue.open);
            }
          }
          done();
        });
    });

    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", (done) => {
      request()
        .get("/api/issues/test?open=true&assigned_to=Joe")
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            const length = res.body.length > 100 ? 100 : res.body.length;
            for (let i = 0; i < length; i++) {
              const issue = res.body[i];
              ISSUE_FIELDS.forEach((p) => assert.property(issue, p));
              assert.isTrue(issue.open);
              assert.strictEqual(issue.assigned_to, "Joe");
            }
          }
          done();
        });
    });
  });

  suite("Update issues", () => {
    test("Update one field on an issue: PUT request to /api/issues/{project}", (done) => {
      done();
    });

    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", (done) => {
      done();
    });

    test("Update an issue with missing _id: PUT request to /api/issues/{project}", (done) => {
      done();
    });

    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {
      done();
    });

    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {
      done();
    });
  });

  suite("Delete issues", () => {
    test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {
      done();
    });

    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {
      done();
    });

    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {
      done();
    });
  });
});
