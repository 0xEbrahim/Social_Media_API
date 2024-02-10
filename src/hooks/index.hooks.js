import { errorHandler, notFound } from "../middlewares/errorHandler.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from '../routes/user.routes.js'
export default (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter)
  app.all('*', notFound);
  app.use(errorHandler);
  
};
