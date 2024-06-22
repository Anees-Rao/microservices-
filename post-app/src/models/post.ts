import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

interface PostAttributes {
    id?: number;
    userId: string;
    text: string;
    createdTime?: Date;
}

class Post extends Model<PostAttributes> implements PostAttributes {
    public id!: number;
    public userId!: string;
    public text!: string;
    public createdTime!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdTime: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        sequelize,
        modelName: 'Post',
    },
);

export default Post;
