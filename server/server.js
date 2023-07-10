const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const booksRouter = require("./routers/booksRouter");
const issuesRouter = require("./routers/issueRouter");
const reportsRouter = require("./routers/reportsRouter");
const cartItemRouter = require("./routers/CartItemRouter");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "*" }));

//mongodb config
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection established..."))
  .catch((err) => console.log(err));

// routes
app.use("/api/users", userRouter);
app.use("/api/books", booksRouter);
app.use("/api/issues", issuesRouter);
app.use("/api/reports", reportsRouter);
app.use("/api", cartItemRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT} ...`);
});
