import "dotenv/config";
import express from "express";
import appSetup from "./utils/app.setup.js";
import appIndex from "./hooks/index.hooks.js";
const app = express();
const port = process.env.PORT || 3000;

appSetup(app);
appIndex(app);

const server = app.listen(port, () => {
  console.log(`Server Started on PORT { ${port} }`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
export default app;
