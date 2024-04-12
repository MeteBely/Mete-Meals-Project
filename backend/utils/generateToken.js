import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
  //userId tutulacak şekilde jwt token oluşturulur.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  //oluşturulan jwt token, cooki'de tutulur.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, //1d
  });
};

export default generateToken;
