import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '../database/database';


export enum OrderStatuses {
    PENDING = 'Ожидает',
    CONFIRMED = 'Подтверждён',
    COMPLETED = 'Завершён',
    CANCELLED = 'Отменён',
}

export interface OrderAttributes {
    orderId: number;
    buyerId: number;
    carId: number;
    orderStatus: OrderStatuses;
    orderDate: string;
    orderSum: number;
}

export type OrderCreationAttributes = Optional<OrderAttributes, 'orderId'>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public orderId!: number;
    public buyerId!: number;
    public carId!: number;
    public orderStatus!: OrderStatuses;
    public orderDate!: string;
    public orderSum!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Order identifier',
        },

        buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'buyers',
                key: 'buyer_id',
            },
            comment: 'Buyer identifier (foreign key)',
        },

        carId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cars',
                key: 'car_id',
            },
            comment: 'Car identifier (foreign key)',
        },

        orderStatus: {
            type: DataTypes.ENUM(...Object.values(OrderStatuses)),
            allowNull: false,
            defaultValue: OrderStatuses.PENDING,
            comment: 'Order status',
        },

        orderDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: 'Order date',
        },

        orderSum: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false,
            validate: {
                min: 0,
            },
            comment: 'Order sum',
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'Order',
        tableName: 'orders',
    }
)

export default Order;