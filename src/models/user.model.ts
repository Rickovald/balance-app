import { sequelize } from '#config/db.config.js';
import { DataTypes, Model, Optional } from 'sequelize';
interface UserAttributes {
    balance: number;
    id: number;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public balance!: number;
    public id!: number;
}

User.init(
    {
        balance: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;
