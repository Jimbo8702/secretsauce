import pkg from "jsonwebtoken";
const { jwt } = pkg;
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

function signToken({ email, name, _id }) {
  const payload = { email, name, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
export { signToken };
