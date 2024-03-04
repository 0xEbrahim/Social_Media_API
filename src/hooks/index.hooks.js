import { errorHandler, notFound } from "../middlewares/errorHandler.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";
import followRouter from "../routes/follow.routes.js";
export default (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/follow", followRouter);
  app.all("*", notFound);
  app.use(errorHandler);
};
