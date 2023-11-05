import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./index";
dotenv.config({ path: "./config.env" });

const DB =
  process.env.DB?.replace("<password>", process.env.DB_PASSWORD || "") || "";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening at port ${port}...`));
