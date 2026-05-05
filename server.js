require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const Student = require('./models/student'); // 引用學生模型

const app = express();
const PORT = process.env.PORT || 3000;

// 設定 EJS 模板
app.set('view engine', 'ejs');

// 靜態檔案 (CSS, JS)
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Session 設定
app.use(session({
  secret: 'scratch-secret',
  resave: false,
  saveUninitialized: true
}));

// 連線 MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB 已連線'))
  .catch(err => console.error('❌ MongoDB 連線失敗:', err));

// 首頁
app.get('/', (req, res) => {
  res.render('index', { title: 'Scratch 教學平台' });
});

// 顯示註冊頁面
app.get('/register', (req, res) => {
  res.render('register');
});

// 顯示登入頁面
app.get('/login', (req, res) => {
  res.render('login');
});

// 註冊功能
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ username, password: hashedPassword });
    await student.save();
    res.send('註冊成功');
  } catch (err) {
    console.error(err);
    res.send('註冊失敗，帳號可能已存在');
  }
});

// 登入功能
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const student = await Student.findOne({ username });
  if (!student) return res.send('帳號不存在');

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.send('密碼錯誤');

  req.session.studentId = student._id;
  res.send('登入成功');
});

// 登出功能
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('已登出');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 伺服器已啟動：http://localhost:${PORT}`);
});
