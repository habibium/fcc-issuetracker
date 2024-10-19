"use strict";
const { createIssue, findAllIssues } = require("../db");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async (req, res) => {
      let project = req.params.project;
      const params = req.query;
      const issues = await findAllIssues(project, params);
      res.json(issues);
    })

    .post(async (req, res) => {
      let project = req.params.project;
      const requiredFields = ["issue_title", "issue_text", "created_by"];

      // check for required fields
      if (!requiredFields.every((field) => req?.body[field])) {
        return res.json({ error: "required field(s) missing" });
      }

      const response = await createIssue({ project, ...req.body });
      return res.json(response);
    })

    .put(async (req, res) => {
      let project = req.params.project;
      res.json([]);
    })

    .delete(async (req, res) => {
      let project = req.params.project;
      res.json([]);
    });
};
