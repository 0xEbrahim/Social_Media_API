import { errorHandler, notFound } from "../middlewares/errorHandler.js";
import authRouter from "../routes/auth.routes.js";

export default (app) => {
  app.use("/api/v1/auth", authRouter);
  app.all('*', notFound);
  app.use(errorHandler);
  
};
