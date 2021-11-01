const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
//routes
const userRouter = require("./routers/user.router");
const blogRouter = require("./routers/blog.router");
const privateRouter = require("./routers/private.router");
//db connect
require("./dbConnect");

const port = process.env.PORT || 5000;

app.use(
    "/",
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use('/api/image', express.static('images'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/private", privateRouter);
app.use("/api/blog", blogRouter);
app.use("/api/auth", userRouter);

app.listen(port, () => console.log(`server has started on port ${port}`));