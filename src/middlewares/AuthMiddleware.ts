import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Authentication from "../utils/Authentication";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const token: string = req.cookies.x_auth;
  if (!token) {
    console.log("not token");
    return res.status(403).json({
      code: 403,
      message: "not token",
    });
  }
  let secretKey = process.env.JWT_SECRET_KEY || "secret";
  try {
    const credential: any = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      // 유효기간이 3일 이하로 남았을 때 토큰 재발급
      const now: any = Math.floor(Date.now() / 1000);
      if (credential.exp - now < 60 * 60 * 24 * 3) {
        const newToken = Authentication.generateToken(
          credential.user_seq,
          credential.user_id
        );
        res.cookie("x_auth", newToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
      }
      return next();
    }
    return res.send("token invalid");
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        code: 403,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(403).json({
      code: 403,
      message: "토큰이 유효하지 않습니다.",
    });
  }
};
