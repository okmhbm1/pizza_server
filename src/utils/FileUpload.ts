import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import moment from 'moment';
import path from 'path';
import randomstring from 'randomstring';

class FileUpload {
  public static fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let date: string = moment().format('YYMMDD');
      if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, 'upload/images/' + date + '/');
      } else {
        cb(null, 'upload/files/' + date + '/');
      }
    },
    filename: (req, file, done) => {
      var fileName = randomstring.generate(8);
      const ext = path.extname(file.originalname);
      done(null, path.basename(fileName, ext) + Date.now() + ext);
    },
  });

  public static upload = multer({
    storage: FileUpload.fileStorage,
    limits: {
      files: 10,
    },
  });

  public static fileDelete = (path: string): any => {
    fs.unlinkSync(path);
  };

  public static fileHandler = (req: Request, res: Response, next: NextFunction): any => {
    let date: string = moment().format('YYMMDD');
    let fileDir: string = 'upload/files/' + date;
    let imageDir: string = 'upload/images/' + date;
    try {
      const stat = fs.lstatSync(fileDir);
    } catch (err) {
      fs.mkdirSync(fileDir, { recursive: true });
      fs.mkdirSync(imageDir, { recursive: true });
    } finally {
      next();
    }
  };
}
export default FileUpload;
