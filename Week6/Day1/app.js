const express = require('express');
const app = express();

app.listen(7777);
const userRouter = require('./routes/users.js')// user -demo
const channelRouter = require('./routes/channels.js');

app.use("/", userRouter)
app.use("/channels",channelRouter) // '/channels' 경로로 시작하는 모든 요청에 대해 userRoutes 사용