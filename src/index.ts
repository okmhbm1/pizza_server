import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';

// Routers
import AuthRoutes from './routers/AuthRoutes';
import UserRoutes from './routers/UserRoutes';
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    this.handlers();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(express.static('public'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors({ origin: true, credentials: true }));
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('pizza server');
    });
    this.app.use('/upload', express.static('upload'));
    this.app.use('/api/auth', AuthRoutes);
    this.app.use('/api/user', UserRoutes);
  }

  protected handlers(): void {
    this.app.use((req: any, res: any, next: any) => {
      res.status(404).send('404 error');
      console.error('404 error');
    });
    this.app.use((err: any, req: any, res: any, next: any) => {
      if (err) {
        res.status(500).send('500 error');
        console.error(err.message || err);
      }
    });
  }
}

const app = new App().app;
app.listen(process.env.PORT, () => {
  console.log('port =  ' + process.env.PORT);
  console.log('db host = ' + process.env.DB_HOST);
});
