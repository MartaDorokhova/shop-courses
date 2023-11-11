const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDTO = require("../dtos/user-dto");
const mailService = require("./mail-service");
const ApiError = require("../exeptions/api-error");

class UserService {
  async registration(email, password, name) {
    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      name,
      activationLink,
      card: { items: [] },
    });
    mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequestError("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
