const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },        // 作品名稱
  description: { type: String },                  // 作品簡介
  scratchLink: { type: String, required: true },  // Scratch 作品連結 (iframe 或 URL)
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // 關聯學生
  createdAt: { type: Date, default: Date.now }    // 建立時間
});

module.exports = mongoose.model('Project', projectSchema);

