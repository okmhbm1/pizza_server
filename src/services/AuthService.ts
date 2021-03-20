import { Request } from 'express';
import Authentication from '../utils/Authentication';
const db = require('../models');

class AuthService {
  body: Request['body'];
  file: Request['file'];
  params: Request['params'];

  constructor(req: Request) {
    this.body = req.body;
    this.file = req.file;
    this.params = req.params;
  }

  login = async () => {
    const { user_email, password } = this.body;
    try {
      const user = await db.User.findOne({
        where: { user_email },
      });
      if (!user) {
        return {
          message: '이메일이 존재하지 않습니다.',
          result: false,
        };
      }
      let compare = await Authentication.passwordCompare(password, user.password);
      if (!compare) {
        return {
          message: '비밀번호가 일치하지 않습니다.',
          result: false,
        };
      }
      let token = Authentication.generateToken(user.user_seq, user.user_email);
      return {
        data: {
          token,
          user_email: user.user_email,
          user_seq: user.user_seq,
          user_name: user.user_name,
          phone_number: user.phone_number,
        },
        message: 'success',
        result: true,
      };
    } catch (error) {
      console.log(error);
      return {
        result: false,
        message: error.message,
      };
    }
  };
}

export default AuthService;
