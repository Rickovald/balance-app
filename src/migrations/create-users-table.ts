import { sequelize } from '#config/db.config.js';
import { DataTypes } from 'sequelize';

export async function down() {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.dropTable('users');
}

export async function up() {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.createTable('users', {
    balance: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
  });

  await queryInterface.bulkInsert('users', [{
    balance: 10000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]);
}
