const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 設定 EJS 模板
app.set('view engine', 'ejs');

// 靜態檔案 (CSS, JS)
app.use(express.static('public'));

// 首頁
app.get('/', (req, res) => {
  res.render('index', { title: 'Scratch 教學平台' });
});

app.listen(PORT, () => {
  console.log(`伺服器已啟動：http://localhost:${PORT}`);
});
