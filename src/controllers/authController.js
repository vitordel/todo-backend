const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../database/models/User');
const baseController = require('./baseController');

const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  const { parsedEmail } = parseForm({
    email,
  });

  const temptoken = bcrypt.hashSync(parsedEmail, 10);

  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    const existingUser = await User.findOne({
      where: {
        email: parsedEmail,
      },
    });

    if (existingUser) {
      return baseController.error(res, 'Usuário já cadastrado');
    }

    const newUser = await User.create({
      email: parsedEmail,
      password: encryptedPassword,
      name,
      temptoken,
    });

    const token = getToken({ email: newUser.email, userId: newUser.id });

    return baseController.success(res, token);
  } catch (e) {
    console.error(e);
    return baseController.error(res, e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { parsedEmail } = parseForm({
    email,
  });

  try {
    const user = await User.findOne({
      where: {
        email: parsedEmail,
      },
    });

    if (!user) {
      return baseController.notFound(res);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return baseController.unauthorized(res);
    }

    const token = getToken({ email: user.email, userId: user.id });

    baseController.success(res, {
      name: user.name,
      email: user.email,
      token,
    });
  } catch (e) {
    console.error(e);
    baseController.error(res, e);
  }
};

const parseForm = ({ email = '' }) => {
  const parsedEmail = email.toLowerCase().trim();

  return {
    parsedEmail,
  };
};

const getToken = ({ email, userId }) => {
  const token = jwt.sign(
    { iss: email, id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' },
  );
  return token;
};

module.exports = {
  register,
  login,
};
