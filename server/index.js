const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const app = express();
dotenv.config();

//routes
const userRouter = require("./routers/user.router");
const blogRouter = require("./routers/blog.router");
//db connect
require("./dbConnect");

const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "port",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(auth)
app.use("/api/blog", blogRouter);
app.use("/api/auth", userRouter);

app.listen(port, () => console.log(`server has started on port ${port}`));