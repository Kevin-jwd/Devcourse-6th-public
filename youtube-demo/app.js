const express = require("express");
const app = express();

const port = 1234;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const userRouter = require('./routes/user-demo')
const channelRouter = require('./routes/channel-demo')

app.use("/", userRouter)
app.use("/", channelRouter)