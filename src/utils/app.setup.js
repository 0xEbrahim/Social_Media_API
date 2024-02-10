import morgan from "morgan";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export default (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(cookieParser());
};
