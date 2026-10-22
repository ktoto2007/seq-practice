const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'storage/database.sqlite',
})

const Cars = sequelize.define('cars', {
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

async function testConnection() {
  await sequelize.authenticate()
  console.log('Соединение с базой данных установлено успешно.')
}

async function createCars() {
  await Cars.create({brand: 'BMW', model: 'X5', year: 2025, price: 15200000, isAvailable: true})
  await Cars.create({brand: 'Toyota', model: 'Camry', year: 2020, price: 2500000.5, isAvailable: true})
  await Cars.create({brand: 'Lada', model: 'Vesta', year: 2022, price: 1300000, isAvailable: false})
}

async function getCars() {
  const cars = await Cars.findAll()
  console.log(JSON.stringify(cars, null, 2))
}

async function main() {
  try {
    await testConnection()
    await sequelize.sync()

    // добавление данных только в пустую таблицу
    if ((await Cars.count()) === 0) {
      await createCars()
    }

    await getCars()
  } catch (error) {
    console.error('Ошибка:', error)
  } finally {
    await sequelize.close()
  }
}

main()