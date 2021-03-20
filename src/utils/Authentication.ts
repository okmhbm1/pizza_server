import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
  public static passwordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
    let result = await bcrypt.compare(text, encryptedText);
    return result;
  };

  public static generateToken = (user_seq: number, user_email: string): string => {
    const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';

    const token: string = jwt.sign({ user_seq, user_email }, secretKey, {
      expiresIn: '7d',
    });
    return token;
  };
}

export default Authentication;
