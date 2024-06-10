const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Получение всех пользователей
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Поиск пользователя по ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Поиск пользователей по никнейму, номеру телефона или почте
exports.searchUsers = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send('Query parameter is required.');
  }

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { nickname: query },
          { phoneNumber: query },
          { email: query }
        ]
      }
    });

    if (users.length === 0) {
      return res.status(404).send('No users found.');
    }

    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nickname, firstName, lastName, birthDate, phoneNumber } = req.body;

  try {
    // Проверяем, что пользователь имеет права на обновление данных
    if (req.user.userId !== parseInt(id, 10)) {
      return res.status(403).send("You are not authorized to update this user.");
    }

    // Обновляем данные пользователя
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Обновляем только переданные поля
    if (nickname) user.nickname = nickname;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (birthDate) user.birthDate = birthDate;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    
    await user.save();

    res.status(200).send('User updated successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};



// Обновление пароля пользователя
exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    // Обновляем пароль пользователя
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    // Устанавливаем новый пароль
    user.password = password;
    await user.save();

    res.status(200).send('Password updated successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Находим пользователя по ID
    const user = await User.findByPk(id);

    // Проверяем, найден ли пользователь
    if (!user) {
      return res.status(404).send('Пользователь не найден');
    }

    // Удаляем пользователя
    await user.destroy();

    // Возвращаем успешный ответ
    res.status(200).send('Пользователь успешно удален');
  } catch (error) {
    // Возвращаем ошибку в случае неудачи
    console.error(error);
    res.status(500).send('Ошибка сервера при удалении пользователя');
  }
};
