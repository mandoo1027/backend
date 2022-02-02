//회원가입
import User from "../../models/user";
import Joi from "joi";
/**
 * POST /api/auth/register
 * @param {username : 'velopert' , password:'mypass123'} ctx
 */
export const register = async (ctx) => {
  const schema = Joi.Object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); //비밀번호 설정
    await user.save(); //데이터베이스 저장

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

//로그인
export const login = async (ctx) => {};

//로그인 상태 확인
export const check = async (ctx) => {};

//로그아웃
export const logout = async (ctx) => {};
