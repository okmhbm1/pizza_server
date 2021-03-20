import { Request, Response } from 'express';
import ControllerInterface from './ControllerInterface';
import UserService from '../services/UserService';

class UserController implements ControllerInterface {
  list = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.list();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  save = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.save();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  email_check = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.email_check();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  password_update = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.password_update();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  detail = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.detail();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  profile_image_edit = async (req: Request, res: Response): Promise<any> => {
    const service: UserService = new UserService(req);
    try {
      const result = await service.profile_image_edit();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  profile_image_delete = async (req: Request, res: Response): Promise<any> => {
    const service: UserService = new UserService(req);
    try {
      const result = await service.profile_image_delete();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  phone_number_check = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.phone_number_check();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        result: false,
        message: error.message,
      });
    }
  };

  password_find = async (req: Request, res: Response): Promise<any> => {
    try {
      const service: UserService = new UserService(req);
      const result = await service.password_find();
      res.send(result);
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

export default new UserController();
