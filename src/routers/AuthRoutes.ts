import BaseRoutes from './BaseRouter';

// Controllers
import AuthController from '../controllers/AuthController';

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/login', AuthController.login);
    this.router.get('/logout', AuthController.logout);
  }
}

export default new AuthRoutes().router;
