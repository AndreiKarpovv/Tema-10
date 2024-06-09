const db = require('../models');
const { User, Exhibit, VirtualTour } = db;
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await db.sequelize.sync({ force: true });

    // Создание пользователей
    const users = await User.bulkCreate([
      {
        nickname: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        birthDate: '1990-01-01',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: await bcrypt.hash('password123', 10)
      },
    ]);

    // Создание экспонатов
    const exhibits = await Exhibit.bulkCreate([
      {
        name: 'ENIAC',
        description: 'Первый электронный универсальный компьютер.',
        image: 'https://example.com/eniac.jpg',
        category: 'Historic',
        yearCreated: 1945
      },
      {
        name: 'iPhone',
        description: 'Один из первых смартфонов с сенсорным экраном, выпущенный Apple.',
        image: 'https://example.com/iphone.jpg',
        category: 'Modern',
        yearCreated: 2007
      },
      {
        name: 'ARPANET',
        description: 'Предшественник современного Интернета, разработанный для военных нужд.',
        image: 'https://example.com/arpanet.jpg',
        category: 'Military',
        yearCreated: 1969
      },
    ]);

    // Создание виртуальных туров
    const virtualTours = await VirtualTour.bulkCreate([
      {
        title: 'История вычислительной техники',
        description: 'Путешествие сквозь историю компьютеров и информационных технологий.',
        photo1: 'https://example.com/tour1/photo1.jpg',
        photo2: 'https://example.com/tour1/photo2.jpg',
        video1: 'https://example.com/tour1/video1.mp4',
        audio1: 'https://example.com/tour1/audio1.mp3'
      },
      {
        title: 'Эволюция мобильных устройств',
        description: 'От первых мобильных телефонов до современных смартфонов.',
        photo1: 'https://example.com/tour2/photo1.jpg',
        photo2: 'https://example.com/tour2/photo2.jpg',
        video1: 'https://example.com/tour2/video1.mp4',
        audio1: 'https://example.com/tour2/audio1.mp3'
      },
    ]);
    

    console.log('Seeding completed!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seed();
