import dotenv from "dotenv";
import mongoose from "mongoose";

interface UnhandledErr {
  name: string;
  message: string;
  stack?: string;
}

// uncaught exceptions (like referencing non-existing variables) will be handled by this guy
// this need to be place before importing app, so that this can effect for the whole app
process.on("uncaughtException", (err: UnhandledErr) => {
  console.log("Uncaught exception found!! Shutting down the application...");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./index";
dotenv.config({ path: "./config.env" });

const DB =
  process.env.DB?.replace("<username>", process.env.USER || "")?.replace(
    "<password>",
    process.env.DB_PASSWORD || ""
  ) || "";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"));

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log(`Server listening at port ${port}...`)
);

// If a promise got trouble, and it's not handled, this guy will
process.on("unhandledRejection", (err: UnhandledErr) => {
  console.log("Unhanlded rejection found!! Shutting down the application...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 0 success, 1 unhandled rejection
  });
});
