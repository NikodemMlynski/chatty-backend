import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { loginSchema } from '../schemes/signin';
import { IAuthDocument } from '../interfaces/auth.interface';
import { IUserDocument } from '@root/features/user/interfaces/user.interface';
import { userService } from '@service/db/user.service';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`);

    const userJwt: string = JWT.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor,
      },
      config.JWT_TOKEN!,
    );
    req.session = { jwt: userJwt };
    // const userDocument: IUserDocument = {
    //   ...user,
    //   authId: existingUser!._id,
    //   username: existingUser!.username,
    //   email: existingUser!.email,
    //   avatarColor: existingUser!.avatarColor,
    //   uId: existingUser!.uId,
    //   createdAt: existingUser!.createdAt,
    // } as IUserDocument;
    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: existingUser, token: userJwt });
  }
}
