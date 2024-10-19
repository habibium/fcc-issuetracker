const mongoose = require("mongoose");

(async function connect() {
  try {
    await mongoose.connect(process.env.MURI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
})();

const IssueSchema = mongoose.Schema({
  assigned_to: String,
  status_text: String,
  open: { type: Boolean, required: true, default: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});
