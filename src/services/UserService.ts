import { Request } from 'express';
import FileUpload from '../utils/FileUpload';
import Authentication from '../utils/Authentication';
const db = require('../models');
class UserService {
  credential: {
    user_seq: number;
    mem_no: number;
    company_no: number;
  };
  body: Request['body'];
  file: Request['file'];
  params: Request['params'];
  query: Request['query'];

  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.file = req.file;
    this.params = req.params;
    this.query = req.query;
  }

  list = async () => {
    const { keyword } = this.query;
    try {
      const users = await db.User.findAll({
        attributes: ['user_seq', 'user_email', 'phone_number', 'created_at', 'updated_at'],
        where: {
          user_email: {
            [db.Sequelize.Op.like]: `%${keyword ? keyword : ''}%`,
          },
        },
        order: [['created_at', 'desc']],
      });
      return {
        data: users,
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

  save = async () => {
    const { user_email, password, user_name, phone_number } = this.body;
    try {
      const idCheck = await db.User.findOne({
        where: { user_email },
      });
      if (!idCheck) {
        const hashedPassword: string = await Authentication.passwordHash(password);
        await db.User.create({
          user_email,
          password: hashedPassword,
          user_name,
          phone_number,
        });
        return {
          message: 'success',
          result: true,
        };
      } else {
        return {
          message: '중복된 아이디 입니다.',
          result: false,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        result: false,
        message: error.message,
      };
    }
  };

  email_check = async () => {
    const { user_email } = this.body;
    try {
      const idCheck = await db.User.findOne({
        where: { user_email },
      });
      if (idCheck) {
        return {
          message: '중복된 아이디 입니다.',
          result: false,
        };
      } else {
        return {
          message: '확인',
          result: true,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        result: false,
        message: error.message,
      };
    }
  };

  password_update = async () => {
    const { user_email, password, change_password } = this.body;
    const originalHashedPassword: string = await Authentication.passwordHash(password);
    const changeHashedPassword: string = await Authentication.passwordHash(change_password);
    try {
      const check = await db.User.findOne({
        where: { user_email, password: originalHashedPassword },
      });
      if (check) {
        await db.User.update(
          {
            password: changeHashedPassword,
          },
          {
            where: {
              user_email: user_email,
            },
          },
        );
        return {
          message: '비밀번호가 변경되었습니다.',
          result: true,
        };
      } else {
        return {
          message: '인증실패.',
          result: false,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        result: false,
        message: error.message,
      };
    }
  };

  detail = async () => {
    const { user_seq } = this.params;
    try {
      const user = await db.User.findOne({
        attributes: ['user_seq', 'user_email', 'phone_number', 'createdAt', 'updatedAt'],
        where: {
          user_seq,
        },
      });
      return {
        data: user,
        message: 'success',
        result: true,
      };
    } catch (error) {
      return {
        message: error.message,
        result: false,
      };
    }
  };

  profile_image_edit = async () => {
    try {
      let file;
      if (this.file) {
        const user: any = await db.User.findOne({
          where: {
            user_seq: this.credential.user_seq,
          },
        });
        if (!user.file_seq) {
          file = await db.File.create({});
          await db.User.update(
            {
              file_seq: file.file_seq,
            },
            {
              where: {
                user_seq: this.credential.user_seq,
              },
            },
          );
        }
        if (user.file_detail_seq) {
          await FileUpload.fileDelete(user.user_profile_image);
          await db.FileDetail.destroy({
            where: {
              file_detail_seq: user.file_detail_seq,
            },
          });
        }
        const fileDetail = await db.FileDetail.create({
          file_seq: user.file_seq ? user.file_seq : file.file_seq,
          original_file_name: this.file.originalname,
          path_file_name: this.file.path,
          file_name: this.file.filename,
          file_size: this.file.size,
          base_path: this.file.destination,
          file_type: this.file.mimetype,
        });
        const userUpdate = await db.User.update(
          {
            user_profile_image: fileDetail.base_path + fileDetail.file_name,
            file_detail_seq: fileDetail.file_detail_seq,
          },
          {
            where: {
              user_seq: this.credential.user_seq,
            },
          },
        );
        return {
          data: userUpdate,
          message: 'success',
          result: true,
        };
      } else {
        return {
          message: 'no image',
          result: true,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        result: false,
      };
    }
  };

  profile_image_delete = async () => {
    try {
      const user = await db.User.findOne({
        where: {
          user_seq: this.credential.user_seq,
        },
      });
      await FileUpload.fileDelete(user.user_profile_image);
      await db.FileDetail.destroy({
        where: {
          file_detail_seq: user.file_detail_seq,
        },
      });
      await db.User.update(
        {
          user_profile_image: '',
          file_detail_seq: null,
        },
        {
          where: {
            user_seq: this.credential.user_seq,
          },
        },
      );
      return {
        message: 'success',
        result: true,
      };
    } catch (error) {
      return {
        message: error.message,
        result: false,
      };
    }
  };

  password_find = async () => {};

  phone_number_check = async () => {};
}

export default UserService;
