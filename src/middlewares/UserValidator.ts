import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validate = [
  check('user_email').isLength({ min: 5, max: 40 }).isEmail().not().isEmpty(),
  check('password').isLength({ min: 6, max: 22 }).not().isEmpty(),
  check('user_name').isLength({ max: 30 }).not().isEmpty(),
  check('phone_number').isLength({ max: 15 }).not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }
    next();
  },
];

/* 
express-validator document 참고하여 상황에 맞게 사용
.isString()
.isEmail()
.custom()
.. 등
*/
export default validate;
