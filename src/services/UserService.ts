import { Request } from 'express';
import FileUpload from '../utils/FileUpload';
import Authentication from '../utils/Authentication';
const db = require('../models');
class UserService {
  credential: {
    userSeq: number;
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
        attributes: ['userSeq', 'userEmail', 'phoneNumber', 'createdAt', 'updatedAt'],
        where: {
          userEmail: {
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
    const { userEmail, password, userName, phoneNumber } = this.body;
    try {
      const idCheck = await db.User.findOne({
        where: { userEmail },
      });
      if (!idCheck) {
        const hashedPassword: string = await Authentication.passwordHash(password);
        await db.User.create({
          userEmail,
          password: hashedPassword,
          userName,
          phoneNumber,
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
    const { userEmail } = this.body;
    try {
      const idCheck = await db.User.findOne({
        where: { userEmail },
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
    const { userEmail, password, changePassword } = this.body;
    const originalHashedPassword: string = await Authentication.passwordHash(password);
    const changeHashedPassword: string = await Authentication.passwordHash(changePassword);
    try {
      const check = await db.User.findOne({
        where: { userEmail, password: originalHashedPassword },
      });
      if (check) {
        await db.User.update(
          {
            password: changeHashedPassword,
          },
          {
            where: {
              userEmail: userEmail,
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
    const { userSeq } = this.params;
    try {
      const user = await db.User.findOne({
        attributes: ['userSeq', 'userEmail', 'phoneNumber', 'createdAt', 'updatedAt'],
        where: {
          userSeq,
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
            userSeq: this.credential.userSeq,
          },
        });
        if (!user.fileSeq) {
          file = await db.File.create({});
          await db.User.update(
            {
              fileSeq: file.fileSeq,
            },
            {
              where: {
                userSeq: this.credential.userSeq,
              },
            },
          );
        }
        if (user.fileDetailSeq) {
          await FileUpload.fileDelete(user.userProfileImage);
          await db.FileDetail.destroy({
            where: {
              fileDetailSeq: user.fileDetailSeq,
            },
          });
        }
        const fileDetail = await db.FileDetail.create({
          fileSeq: user.fileSeq ? user.fileSeq : file.fileSeq,
          originalFileName: this.file.originalname,
          pathFileName: this.file.path,
          fileName: this.file.filename,
          fileSize: this.file.size,
          basePath: this.file.destination,
          fileType: this.file.mimetype,
        });
        const userUpdate = await db.User.update(
          {
            userProfileImage: fileDetail.base_path + fileDetail.file_name,
            fileDetailSeq: fileDetail.fileDetailSeq,
          },
          {
            where: {
              userSeq: this.credential.userSeq,
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
          userSeq: this.credential.userSeq,
        },
      });
      await FileUpload.fileDelete(user.userProfileImage);
      await db.FileDetail.destroy({
        where: {
          fileDetailSeq: user.fileDetailSeq,
        },
      });
      await db.User.update(
        {
          userProfileImage: '',
          fileDetailSeq: null,
        },
        {
          where: {
            userSeq: this.credential.userSeq,
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
