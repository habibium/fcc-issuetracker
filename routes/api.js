"use strict";
const e = require("express");
const { createIssue, findAllIssues, deleteIssue } = require("../db");

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
      const { _id } = req.body;
      if (!_id) return res.json({ error: "missing _id" });

      try {
        const r = await deleteIssue(_id);
        if (!r?._id) return res.json({ _id, error: "could not delete" });
        return res.json({ _id, result: "successfully deleted" });
      } catch (error) {
        return res.json({ _id, error: "could not delete" });
      }
    });
};
