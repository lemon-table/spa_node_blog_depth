import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

//.env에 있는 여러 값들을, prosess.env 객체 안에 추가하게 된다.
dotEnv.config();

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  createUser = async (email, nickname, password, confirmPassword) => {
    const isValidEmail = validator.isEmail(email);

    // 이메일 형식 검증
    if (!isValidEmail) throw new Error("INVALID_EMAIL_FORMAT");
    // 패스워드 체크 (6자리 미만)
    if (password.length < 6) throw new Error("PASSWORD_LENGTH_ERROR");
    // 패스워드 체크(비밀번호 확인란 일치여부))
    if (password !== confirmPassword) throw new Error("PASSWORD_MISMATCH");

    const chkUser = await this.usersRepository.findUser(email);

    // 계정 사용여부 체크
    if (chkUser) throw new Error("EMAIL_ALREADY_IN_USE");

    // 위 이상 없으면 password bcrypt 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser(
      email,
      nickname,
      hashedPassword
    );

    // password,를 뺀 상태로, Controller에게 Response 전달한다.
    return {
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
  };

  loginUser = async (email, password) => {
    const user = await this.usersRepository.findUser(email);

    // 계정 사용여부 체크
    if (!user) throw new Error("INVALID_CREDENTIALS");

    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("INVALID_CREDENTIALS");

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" } // 10분 유효기간 설정
    );

    return { email: user.email, token: token };
  };
}
