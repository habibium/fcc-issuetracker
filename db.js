const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MURI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

const IssueSchema = mongoose.Schema({
  project: { type: String, required: true },
  assigned_to: { type: String, default: "" },
  status_text: { type: String, default: "" },
  open: { type: Boolean, required: true, default: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});

const Issue = mongoose.model("issue", IssueSchema);

const createIssue = async (issue) => {
  const newIssue = await Issue.create(issue);

  return newIssue.toObject({
    transform: (_doc, ret) => {
      delete ret.project;
      delete ret.__v;

      return ret;
    },
  });
};

const findAllIssues = async (project, params) =>
  await Issue.find({ project, ...params }).select("-project");

const findIssueById = async (id) => await Issue.findById(id).exec();

const updateIssue = async (id, updates) => {
  const updatedIssue = await Issue.findByIdAndUpdate(id, updates).exec();
  return updatedIssue;
};

const deleteIssue = async (id) => await Issue.findByIdAndDelete(id).exec();

module.exports = {
  dbConnect,
  createIssue,
  findAllIssues,
  findIssueById,
  updateIssue,
  deleteIssue,
};
