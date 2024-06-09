const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  const { nickname, firstName, lastName, birthDate, email, phoneNumber, password } = req.body;
  try {
    const user = await User.create({
      nickname,
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      password, 
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err); // Выводим ошибку в консоль для отладки
    res.status(500).send('Internal Server Error');
  }
};


exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  // Проверка, что значение идентификатора не пустое
  if (!identifier) {
    return res.status(400).send('Nickname, email, or phone number is required');
  }

  try {
    // Поиск пользователя по никнейму, электронной почте или номеру телефона
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { nickname: identifier },
          { email: identifier },
          { phoneNumber: identifier }
        ]
      }
    });

    // Если пользователь не найден, возвращаем ошибку 401 (Unauthorized)
    if (!user) {
      return res.status(401).send('User not found');
    }

    // Проверка соответствия пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    // Генерация токена JWT для пользователя
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
