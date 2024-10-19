const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  const requester = chai.request(server).keepOpen();

  suite("Create issues", () => {
    test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {});
    test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {});
    test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {});
  });

  suite("View issues", () => {
    test("View issues on a project: GET request to /api/issues/{project}", (done) => {
      requester.get("/api/issues/test").end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
    });
    test("View issues on a project with one filter: GET request to /api/issues/{project}", (done) => {});
    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", (done) => {});
  });

  suite("Update issues", () => {
    test("Update one field on an issue: PUT request to /api/issues/{project}", (done) => {});
    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", (done) => {});
    test("Update an issue with missing _id: PUT request to /api/issues/{project}", (done) => {});
    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {});
    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {});
  });

  suite("Delete issues", () => {
    test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {});
    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {});
    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {});
  });
});
