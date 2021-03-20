import BaseRoutes from './BaseRouter';
import { auth } from '../middlewares/AuthMiddleware';
import FileUpload from '../utils/FileUpload';
import validate from '../middlewares/UserValidator';
// Controllers
import UserController from '../controllers/UserController';
class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/list', auth, UserController.list);
    this.router.post('/save', validate, UserController.save);
    this.router.post('/email_check', UserController.email_check);
    this.router.post('/password_update', auth, UserController.password_update);
    this.router.get('/detail/:user_seq', auth, UserController.detail);
    this.router.post(
      '/profile_image/edit',
      auth,
      FileUpload.fileHandler,
      FileUpload.upload.single('single'),
      UserController.profile_image_edit,
    );
    this.router.post('/profile_image/delete', auth, UserController.profile_image_delete);
    // 미완료
    this.router.post('/phone_number_check', auth, UserController.phone_number_check);
    this.router.post('/password_find', auth, UserController.password_find);
  }
}

export default new UserRoutes().router;
