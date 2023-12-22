const mongoose = require('mongoose');

const TestdataSchema = new mongoose.Schema({
  end_year: { type: Number },
  intensity: { type: Number },
  sector: { type: String },
  topic: { type: String },
  insight: { type: String },
  url: { type: String },
  region: { type: String },
  start_year: { type: Number },
  impact: { type: String },
  added: { type: String }, // Consider using Date type if storing dates
  published: { type: String }, // Consider using Date type if storing dates
  country: { type: String },
  relevance: { type: Number },
  pestle: { type: String },
  source: { type: String },
  title: { type: String },
  likelihood: { type: Number },
});

const TestdataModel = mongoose.model('Testdata', TestdataSchema);

module.exports = TestdataModel;
