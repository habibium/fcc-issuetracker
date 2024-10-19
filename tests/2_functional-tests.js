const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const ISSUE_FIELDS = [
  "assigned_to",
  "status_text",
  "open",
  "_id",
  "issue_title",
  "issue_text",
  "created_by",
  "created_on",
  "updated_on",
];

const request = () => chai.request(server).keepOpen();

suite("Functional Tests", function () {
  suite("Create issues", () => {
    test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
      const testIssue = {
        issue_title: "Test issue with every field",
        issue_text: "This is a test issue with every field",
        created_by: "Functional test",
        assigned_to: "BesterTesterMochaChai",
        status_text: "In progress",
      };

      request()
        .post("/api/issues/apitest")
        .type("form")
        .send(testIssue)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          ISSUE_FIELDS.forEach((p) => assert.property(res.body, p));
          for (const key in testIssue) {
            assert.strictEqual(res.body[key], testIssue[key]);
          }
        });
      done();
    });

    test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
      const testIssue = {
        issue_title: "Test issue with only required fields",
        issue_text: "This is a test issue with only required fields",
        created_by: "Functional test",
      };

      request()
        .post("/api/issues/apitest")
        .type("form")
        .send(testIssue)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          ISSUE_FIELDS.forEach((p) => assert.property(res.body, p));
          for (const key in testIssue) {
            assert.strictEqual(res.body[key], testIssue[key]);
          }
        });
      done();
    });

    test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
      request()
        .post("/api/issues/apitest")
        .type("form")
        .send({})
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "required field(s) missing");
        });
    });
  });

  suite("View issues", () => {
    test("View issues on a project: GET request to /api/issues/{project}", (done) => {
      request()
        .get("/api/issues/apitest")
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
        .get("/api/issues/apitest?open=true")
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
      const filters = {
        open: true,
        assigned_to: "Joe",
      };

      request()
        .get(`/api/issues/apitest?${new URLSearchParams(filters).toString()}`)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          if (res.body.length > 0) {
            const length = res.body.length > 100 ? 100 : res.body.length;
            for (let i = 0; i < length; i++) {
              const issue = res.body[i];
              ISSUE_FIELDS.forEach((p) => assert.property(issue, p));
              assert.strictEqual(issue.open, filters.open);
              assert.strictEqual(issue.assigned_to, filters.assigned_to);
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
      request()
        .put("/api/issues/apitest")
        .type("form")
        .send({ _id: "" })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "missing _id");
        });
      done();
    });

    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {
      request()
        .get("/api/issues/apitest")
        .end((_err, getResponse) => {
          // check if the response is an array and has at least one issue
          if (
            Array.isArray(getResponse.body) &&
            getResponse.body.length > 0 &&
            getResponse.body[0]?._id
          )
            request()
              .put("/api/issues/apitest")
              .type("form")
              .send({
                _id: getResponse.body[0]._id,
                issue_title: "",
                issue_text: "",
                created_by: "",
                assigned_to: "",
                status_text: "",
              })
              .end((_err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, "_id");
                assert.property(res.body, "error");
                assert.strictEqual(res.body._id, getResponse.body[0]._id);
                assert.strictEqual(res.body.error, "no update field(s) sent");
              });
        });

      done();
    });

    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {
      done();
    });
  });

  suite("jelete issues", () => {
    test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {
      // get an issue to delete
      request()
        .get("/api/issues/apitest")
        .end((_err, getResponse) => {
          // check if the response is an array and has at least one issue
          if (
            Array.isArray(getResponse.body) &&
            getResponse.body.length > 0 &&
            getResponse.body[0]?._id
          )
            request()
              .delete("/api/issues/apitest")
              .type("form")
              .send({ _id: getResponse.body[0]._id })
              .end((_err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, "result");
                assert.property(res.body, "_id");
                assert.strictEqual(res.body.result, "successfully deleted");
                // compare both ids
                assert.strictEqual(res.body._id, getResponse.body[0]._id);
              });
        });
      done();
    });

    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {
      const newId = crypto.randomUUID();
      request()
        .delete("/api/issues/apitest")
        .type("form")
        .send({ _id: newId })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "_id");
          assert.property(res.body, "error");
          assert.strictEqual(res.body._id, newId);
          assert.strictEqual(res.body.error, "could not delete");
        });
      done();
    });

    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {
      request()
        .delete("/api/issues/apitest")
        .type("form")
        .send({ _id: "" })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.strictEqual(res.body.error, "missing _id");
        });
      done();
    });
  });
});
