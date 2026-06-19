import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '../database/database';


export enum CarBodyTypes {
    HATCHBACK = 'Хэтчбек',
    SEDAN = 'Седан',
    COUPE = 'Купе',
    CABRIOLET = 'Кабриолет',
    UNIVERSAL = 'Универсал',
    SUV = 'Внедорожник',
    CROSSOVER = 'Кроссовер',
    VAN = 'Вэн'
}

export enum CarWheelDrives {
    FWD = 'Передний',
    RWD = 'Задний',
    AWD = 'Полный'
}

export enum CarGearboxes {
    AUTOMATIC = 'АКПП',
    MANUAL = 'МКПП'
}

export enum CarCompletions {
    BASE = 'Базовая',
    MEDIUM = 'Средняя',
    MAXIMUM = 'Максимальная'
}

export enum CarConditions {
    NEW = 'Новый',
    USED = 'Б/У'
}

export enum CarColors {
    WHITE = 'Белый',
    GREY = 'Серый',
    BLACK = 'Черный',
    BLUE = 'Синий',
    RED = 'Красный',
    GREEN = 'Зеленый',
    YELLOW = 'Желтый',
    ORANGE = 'Оранжевый',
    VIOLET = 'Фиолетовый'
}

export interface CarAttributes {
    carId: number;
    carBrand: string;
    carModel: string;
    carReleaseDate: string | null;
    carCondition: CarConditions;
    carMileage: number;
    carBodyType: CarBodyTypes;
    carWheelDrive: CarWheelDrives;
    carGearbox: CarGearboxes;
    carCompletion: CarCompletions;
    carColor: CarColors;
    carEngineCapacity: number;
    carHorsePower: number;
    carPrice: number;
}

export type CarCreationAttributes = Optional<CarAttributes, 'carId'>;

export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    public carId!: number;
    public carBrand!: string;
    public carModel!: string;
    public carReleaseDate!: string | null;
    public carCondition!: CarConditions;
    public carMileage!: number;
    public carBodyType!: CarBodyTypes;
    public carWheelDrive!: CarWheelDrives;
    public carGearbox!: CarGearboxes;
    public carCompletion!: CarCompletions;
    public carColor!: CarColors;
    public carEngineCapacity!: number;
    public carHorsePower!: number;
    public carPrice!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Car.init(
    {
        carId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Car identifier',
        },

        carBrand: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Car brand',
        },

        carModel: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Car model',
        },

        carReleaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: 'Car date of release',
        },

        carCondition: {
            type: DataTypes.ENUM(...Object.values(CarConditions)),
            allowNull: false,
            comment: 'Car condition',
        },

        carMileage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: 'Car mileage in km',
        },

        carBodyType: {
            type: DataTypes.ENUM(...Object.values(CarBodyTypes)),
            allowNull: false,
            comment: 'Car body type',
        },

        carWheelDrive: {
            type: DataTypes.ENUM(...Object.values(CarWheelDrives)),
            allowNull: false,
            comment: 'Car wheel drive',
        },

        carGearbox: {
            type: DataTypes.ENUM(...Object.values(CarGearboxes)),
            allowNull: false,
            comment: 'Car gearbox',
        },

        carCompletion: {
            type: DataTypes.ENUM(...Object.values(CarCompletions)),
            allowNull: false,
            comment: 'Car completion',
        },

        carColor: {
            type: DataTypes.ENUM(...Object.values(CarColors)),
            allowNull: false,
            comment: 'Car color',
        },

        carEngineCapacity: {
            type: DataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
            validate: {
                min: 0.1,
                max: 9.9,
            },
            comment: 'Car engine capacity',
        },

        carHorsePower: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1,
                max: 2000,
            },
            comment: 'Car horse power',
        },

        carPrice: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false,
            validate: {
                min: 0,
            },
            comment: 'Car price in RUB',
        },

    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'Car',
        tableName: 'cars',
    }
)

export default Car;