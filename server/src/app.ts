import cors from 'cors';
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import Youch from 'youch';
import 'express-async-errors';

import routes from './routes';

// Uncomment this line to enable database access
// --------
// import './database';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes(): void {
    this.server.use(routes);
  }

  exceptionHandler(): void {
    this.server.use(
      async (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        if (process.env.NODE_ENV === 'development') {
          const errors = await new Youch(err, req).toJSON();

          return res.status(500).json(errors);
        }

        return res.status(500).json({ error: 'Internal server error' });
      },
    );
  }
}

export default new App().server;
