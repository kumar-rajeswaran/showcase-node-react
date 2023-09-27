import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { SERVER_PORT, dbConfig } from "./configs";
import { errorHandlingMiddleware } from "./middlewares";
import { IRoutes } from "./types";
import { UserRoutes } from "./routes";

export class App {
  public app: express.Application;
  public port: string | number;
  constructor() {
    this.app = express();
    this.port = SERVER_PORT || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes([new UserRoutes()]);
    this.app.use(errorHandlingMiddleware);
  }

  public listen() {
    dbConfig
      .initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log("Data Source has been initialized!");
          console.info(`🚀 http://localhost:${this.port}`);
        });
      })
      .catch((dbConnectionError) => {
        console.error("Error during Data Source initialization:", { dbConnectionError });
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }
}
