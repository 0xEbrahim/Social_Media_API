import morgan from "morgan";
import express from "express";
import cors from "cors";

export default (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
 app.use(cors());
};
