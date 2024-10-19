"use strict";

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      res.json({});
    })

    .post(function (req, res) {
      let project = req.params.project;
      res.json([]);
    })

    .put(function (req, res) {
      let project = req.params.project;
      res.json([]);
    })

    .delete(function (req, res) {
      let project = req.params.project;
      res.json([]);
    });
};
