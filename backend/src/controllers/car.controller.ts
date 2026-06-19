import {Request, Response} from 'express';
import {Op} from 'sequelize';
import {Car, CarConditions} from '../models/car.model';
import {createLogger} from '../utils/logger';

const logger = createLogger('car.controller');

export async function createCar(req: Request, res: Response): Promise<void> {
    logger.info('Creating car');

    const {
        carBrand,
        carModel,
        carReleaseDate,
        carBodyType,
        carWheelDrive,
        carGearbox,
        carCompletion,
        carColor,
        carEngineCapacity,
        carHorsePower,
        carMileage,
        carCondition,
        carPrice,
    } = req.body;

    if (
        !carBrand || !carModel || !carReleaseDate || !carBodyType ||
        !carWheelDrive || !carGearbox || !carCompletion || !carColor ||
        !carEngineCapacity || !carHorsePower || !carMileage ||
        !carCondition || !carPrice
    ) {
        res.status(400).json({message: 'Заполните все обязательные поля'});
        return;
    }

    try {
        const car = await Car.create({
            carBrand,
            carModel,
            carReleaseDate,
            carBodyType,
            carWheelDrive,
            carGearbox,
            carCompletion,
            carColor,
            carEngineCapacity,
            carHorsePower,
            carMileage,
            carCondition,
            carPrice,
        });

        res.status(201).json({data: car});
    } catch (error) {
        logger.error('Failed to create car', error);
        res.status(500).json({message: 'Ошибка при создании автомобиля'});
    }
}

export async function getCars(req: Request, res: Response): Promise<void> {
    logger.info('Getting cars');

    try {
        const cars = await Car.findAll();
        res.status(200).json({data: cars});
    } catch (error) {
        logger.error('Failed to get cars', error);
        res.status(500).json({message: 'Ошибка при получении автомобилей'});
    }
}

export async function getCarById(req: Request, res: Response): Promise<void> {
    logger.info('Getting car by id');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    try {
        const car = await Car.findByPk(Number(id));

        if (!car) {
            res.status(404).json({message: 'Автомобиль не найден'});
            return;
        }

        res.status(200).json({data: car});
    } catch (error) {
        logger.error('Failed to get car by id', error);
        res.status(500).json({message: 'Ошибка при получении автомобиля'});
    }
}

export async function updateCar(req: Request, res: Response): Promise<void> {
    logger.info('Updating car');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    const {
        carBrand,
        carModel,
        carReleaseDate,
        carBodyType,
        carWheelDrive,
        carGearbox,
        carCompletion,
        carColor,
        carEngineCapacity,
        carHorsePower,
        carMileage,
        carCondition,
        carPrice,
    } = req.body;

    if (
        !carBrand && !carModel && !carReleaseDate && !carBodyType &&
        !carWheelDrive && !carGearbox && !carCompletion && !carColor &&
        !carEngineCapacity && !carHorsePower && !carMileage &&
        !carCondition && !carPrice
    ) {
        res.status(400).json({message: 'Передайте хотя бы одно поле для обновления'});
        return;
    }

    try {
        const car = await Car.findByPk(Number(id));

        if (!car) {
            res.status(404).json({message: 'Автомобиль не найден'});
            return;
        }

        await car.update({
            carBrand,
            carModel,
            carReleaseDate,
            carBodyType,
            carWheelDrive,
            carGearbox,
            carCompletion,
            carColor,
            carEngineCapacity,
            carHorsePower,
            carMileage,
            carCondition,
            carPrice,
        });

        res.status(200).json({data: car});
    } catch (error) {
        logger.error('Failed to update car', error);
        res.status(500).json({message: 'Ошибка при обновлении данных автомобиля'});
    }
}

export async function deleteCar(req: Request, res: Response): Promise<void> {
    logger.info('Deleting car');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    try {
        const car = await Car.findByPk(Number(id));

        if (!car) {
            res.status(404).json({message: 'Автомобиль не найден'});
            return;
        }

        await car!.destroy();
        res.status(200).json({message: 'Автомобиль успешно удалён'});
    } catch (error) {
        logger.error('Failed to delete car', error);
        res.status(500).json({message: 'Ошибка при удалении автомобиля'});
    }
}

export async function getCarsLowMileage(req: Request, res: Response): Promise<void> {
    logger.info('Getting cars with mileage less than 30 000 km');

    try {
        const cars = await Car.findAll({
            where: {
                carMileage: {[Op.lt]: 30000},
            },
        });

        res.status(200).json({data: cars});
    } catch (error) {
        logger.error('Failed to get cars with mileage less than 30 000 km', error);
        res.status(500).json({message: 'Ошибка при получении автомобилей'});
    }
}

export async function getNewCars(req: Request, res: Response): Promise<void> {
    logger.info('Getting new cars');

    try {
        const cars = await Car.findAll({
            where: {
                carCondition: CarConditions.NEW,
            },
        });

        res.status(200).json({data: cars});
    } catch (error) {
        logger.error('Failed to get new cars', error);
        res.status(500).json({message: 'Ошибка при получении автомобилей'});
    }
}

export async function getMostExpensiveCar(req: Request, res: Response): Promise<void> {
    logger.info('Getting the most expensive car');

    try {
        const car = await Car.findOne({
            order: [['car_price', 'DESC']],
        });

        if (!car) {
            res.status(404).json({message: 'Автомобиль не найден'});
            return;
        }

        res.status(200).json({data: car});
    } catch (error) {
        logger.error('Failed to get the most expensive car', error);
        res.status(500).json({message: 'Ошибка при получении автомобиля'});
    }
}