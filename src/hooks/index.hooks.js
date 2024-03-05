import { errorHandler, notFound } from "../middlewares/errorHandler.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";
import followRouter from "../routes/follow.routes.js";
import storyRouter from "../routes/story.routes.js";
import likeRouter from "../routes/like.routes.js";
import commentRouter from "../routes/comment.routes.js";
export default (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/follow", followRouter);
  app.use("/api/v1/story", storyRouter);
  app.use("/api/v1/like", likeRouter);
  app.use("/api/v1/comment", commentRouter);
  app.all("*", notFound);
  app.use(errorHandler);
};
