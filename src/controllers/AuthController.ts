import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  login = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: AuthService = new AuthService(req);
      const result: any = await service.login();
      if (result.result && result.data) {
        res
          .cookie('x_auth', result.data.token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          })
          .status(200)
          .json(result);
      } else {
        res.send(result);
      }
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<any> => {
    try {
      return res.cookie('x_auth', '').json({
        message: '로그아웃',
        result: true,
      });
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };
}

export default new AuthController();
