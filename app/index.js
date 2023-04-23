// 引入 express 包
const express = require('express');

// 创建 express 应用对象
const app = express();

// 定义路由处理器
app.get('/', (req, res) => {
  // 响应主页请求
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  // 响应关于页面请求
  res.send('This is a simple Express server.');
});

// 让应用对象监听 3000 端口
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
