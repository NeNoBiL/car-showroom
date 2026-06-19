import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '../database/database';
import {CarBodyTypes, CarWheelDrives, CarGearboxes, CarConditions, CarCompletions, CarColors} from './car.model'


export interface BuyerAttributes {
    buyerId: number;
    buyerSurname: string;
    buyerName: string;
    buyerPatronymic?: string | null;
    buyerTel: string;
    buyerPreferredBrand?: string | null;
    buyerPreferredModel?: string | null;
    buyerPreferredBodyType?: CarBodyTypes | null;
    buyerPreferredWheelDrive?: CarWheelDrives | null;
    buyerPreferredGearbox?: CarGearboxes | null;
    buyerPreferredCondition?: CarConditions | null;
    buyerPreferredCompletion?: CarCompletions | null;
    buyerPreferredColor?: CarColors | null;
    buyerCarReleaseDate?: string | null;
    buyerMaxMileage?: number | null;
    buyerMaxPrice?: number | null;
}

export type BuyerCreationAttributes = Optional<BuyerAttributes, 'buyerId' | 'buyerPatronymic'
    | 'buyerPreferredBrand' | 'buyerPreferredModel' | 'buyerPreferredBodyType'
    | 'buyerPreferredWheelDrive' | 'buyerPreferredGearbox' | 'buyerPreferredCondition'
    | 'buyerPreferredCompletion' | 'buyerPreferredColor' | 'buyerCarReleaseDate'
    | 'buyerMaxMileage' | 'buyerMaxPrice'>;

export class Buyer extends Model<BuyerAttributes, BuyerCreationAttributes> implements BuyerAttributes {
    public buyerId!: number;
    public buyerSurname!: string;
    public buyerName!: string;
    public buyerPatronymic?: string | null;
    public buyerTel!: string;
    public buyerPreferredBrand?: string | null;
    public buyerPreferredModel?: string | null;
    public buyerPreferredBodyType?: CarBodyTypes | null;
    public buyerPreferredWheelDrive?: CarWheelDrives | null;
    public buyerPreferredGearbox?: CarGearboxes | null;
    public buyerPreferredCondition?: CarConditions | null;
    public buyerPreferredCompletion?: CarCompletions | null;
    public buyerPreferredColor?: CarColors | null;
    public buyerCarReleaseDate?: string | null;
    public buyerMaxMileage?: number | null;
    public buyerMaxPrice?: number | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Buyer.init(
    {
        buyerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Buyer identifier',
        },

        buyerSurname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            },
            comment: 'Buyer surname',
        },

        buyerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            },
            comment: 'Buyer name',
        },

        buyerPatronymic: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
            comment: 'Buyer patronymic',
        },

        buyerTel: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
            validate: {
                is: /^\d{2}-\d{2}-\d{2}$/,
            },
            comment: 'Buyer phone number',
        },

        buyerPreferredBrand: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
            comment: 'Buyer preferred car brand',
        },

        buyerPreferredModel: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
            comment: 'Buyer preferred car model',
        },

        buyerPreferredBodyType: {
            type: DataTypes.ENUM(...Object.values(CarBodyTypes)),
            allowNull: true,
            comment: 'Buyer preferred car body type',
        },

        buyerPreferredWheelDrive: {
            type: DataTypes.ENUM(...Object.values(CarWheelDrives)),
            allowNull: true,
            comment: 'Buyer preferred car wheel drive',
        },

        buyerPreferredGearbox: {
            type: DataTypes.ENUM(...Object.values(CarGearboxes)),
            allowNull: true,
            comment: 'Buyer preferred car gearbox',
        },

        buyerPreferredCondition: {
            type: DataTypes.ENUM(...Object.values(CarConditions)),
            allowNull: true,
            comment: 'Buyer preferred car condition',
        },

        buyerPreferredCompletion: {
            type: DataTypes.ENUM(...Object.values(CarCompletions)),
            allowNull: true,
            comment: 'Buyer preferred car completion',
        },

        buyerPreferredColor: {
            type: DataTypes.ENUM(...Object.values(CarColors)),
            allowNull: true,
            comment: 'Buyer preferred car color',
        },

        buyerCarReleaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: 'Buyer car release date',
        },

        buyerMaxMileage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            validate: {
                min: 0,
            },
            comment: 'Buyer max car mileage',
        },

        buyerMaxPrice: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: true,
            validate: {
                min: 0,
            },
            comment: 'Buyer max price',
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'Buyer',
        tableName: 'buyers',
    }
)

export default Buyer;