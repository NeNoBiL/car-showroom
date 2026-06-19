import {Request, Response} from 'express';
import {WhereOptions} from 'sequelize';
import {Buyer, BuyerAttributes} from '../models/buyer.model';
import {createLogger} from '../utils/logger';

const logger = createLogger('buyer.controller');

export async function createBuyer(req: Request, res: Response): Promise<void> {
    logger.info('Creating buyer');

    const {
        buyerSurname,
        buyerName,
        buyerPatronymic,
        buyerTel,
        buyerPreferredBrand,
        buyerPreferredModel,
        buyerPreferredBodyType,
        buyerPreferredWheelDrive,
        buyerPreferredGearbox,
        buyerPreferredCondition,
        buyerPreferredCompletion,
        buyerPreferredColor,
        buyerCarReleaseDate,
        buyerMaxMileage,
        buyerMaxPrice,
    } = req.body;

    if (!buyerSurname || !buyerName || !buyerTel) {
        res.status(400).json({message: 'Заполните все обязательные поля'});
        return;
    }

    try {
        const buyer = await Buyer.create({
            buyerSurname,
            buyerName,
            buyerPatronymic,
            buyerTel,
            buyerPreferredBrand,
            buyerPreferredModel,
            buyerPreferredBodyType,
            buyerPreferredWheelDrive,
            buyerPreferredGearbox,
            buyerPreferredCondition,
            buyerPreferredCompletion,
            buyerPreferredColor,
            buyerCarReleaseDate,
            buyerMaxMileage,
            buyerMaxPrice,
        });

        res.status(201).json({data: buyer});
    } catch (error) {
        logger.error('Failed to create buyer', error);
        res.status(500).json({message: 'Ошибка при создании покупателя'});
    }
}

export async function getBuyers(req: Request, res: Response): Promise<void> {
    logger.info('Getting buyers');

    try {
        const buyers = await Buyer.findAll();
        res.status(200).json({data: buyers});
    } catch (error) {
        logger.error('Failed to get buyers', error);
        res.status(500).json({message: 'Ошибка при получении покупателей'});
    }
}

export async function getBuyerById(req: Request, res: Response): Promise<void> {
    logger.info('Getting buyer by id');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    try {
        const buyer = await Buyer.findByPk(Number(id));

        if (!buyer) {
            res.status(404).json({message: 'Покупатель не найден'});
            return;
        }

        res.status(200).json({data: buyer});
    } catch (error) {
        logger.error('Failed to get buyer by id', error);
        res.status(500).json({message: 'Ошибка при получении покупателя'});
    }
}

export async function updateBuyer(req: Request, res: Response): Promise<void> {
    logger.info('Updating buyer');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    const {
        buyerSurname,
        buyerName,
        buyerPatronymic,
        buyerTel,
        buyerPreferredBrand,
        buyerPreferredModel,
        buyerPreferredBodyType,
        buyerPreferredWheelDrive,
        buyerPreferredGearbox,
        buyerPreferredCondition,
        buyerPreferredCompletion,
        buyerPreferredColor,
        buyerCarReleaseDate,
        buyerMaxMileage,
        buyerMaxPrice,
    } = req.body;

    if (
        !buyerSurname && !buyerName && !buyerPatronymic && !buyerTel &&
        !buyerPreferredBrand && !buyerPreferredModel && !buyerPreferredBodyType &&
        !buyerPreferredWheelDrive && !buyerPreferredGearbox && !buyerPreferredCondition &&
        !buyerPreferredCompletion && !buyerPreferredColor && !buyerCarReleaseDate &&
        !buyerMaxMileage && !buyerMaxPrice
    ) {
        res.status(400).json({message: 'Передайте хотя бы одно поле для обновления'});
        return;
    }

    try {
        const buyer = await Buyer.findByPk(Number(id));

        if (!buyer) {
            res.status(404).json({message: 'Покупатель не найден'});
            return;
        }

        await buyer.update({
            buyerSurname,
            buyerName,
            buyerPatronymic,
            buyerTel,
            buyerPreferredBrand,
            buyerPreferredModel,
            buyerPreferredBodyType,
            buyerPreferredWheelDrive,
            buyerPreferredGearbox,
            buyerPreferredCondition,
            buyerPreferredCompletion,
            buyerPreferredColor,
            buyerCarReleaseDate,
            buyerMaxMileage,
            buyerMaxPrice,
        });

        res.status(200).json({data: buyer});
    } catch (error) {
        logger.error('Failed to update buyer', error);
        res.status(500).json({message: 'Ошибка при обновлении данных покупателя'});
    }
}

export async function deleteBuyer(req: Request, res: Response): Promise<void> {
    logger.info('Deleting buyer');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    try {
        const buyer = await Buyer.findByPk(Number(id));

        if (!buyer) {
            res.status(404).json({message: 'Покупатель не найден'});
            return;
        }

        await buyer!.destroy();
        res.status(200).json({message: 'Покупатель успешно удалён'});
    } catch (error) {
        logger.error('Failed to delete buyer', error);
        res.status(500).json({message: 'Ошибка при удалении покупателя'});
    }
}

export async function getBuyersByCarParams(req: Request, res: Response): Promise<void> {
    logger.info('Getting buyers by car parameters');

    const {
        buyerPreferredBrand,
        buyerPreferredModel,
        buyerPreferredBodyType,
        buyerPreferredWheelDrive,
        buyerPreferredGearbox,
        buyerPreferredCondition,
        buyerPreferredCompletion,
        buyerPreferredColor,
        buyerCarReleaseDate,
        buyerMaxMileage,
        buyerMaxPrice,
    } = req.query;

    if (
        !buyerPreferredBrand && !buyerPreferredModel && !buyerPreferredBodyType &&
        !buyerPreferredWheelDrive && !buyerPreferredGearbox && !buyerPreferredCondition &&
        !buyerPreferredCompletion && !buyerPreferredColor && !buyerCarReleaseDate &&
        !buyerMaxMileage && !buyerMaxPrice
    ) {
        res.status(400).json({message: 'Передайте хотя бы одно поле для поиска'});
        return;
    }

    try {
        const whereClause: WhereOptions<BuyerAttributes> = {};

        if (buyerPreferredBrand) whereClause.buyerPreferredBrand = buyerPreferredBrand as string;
        if (buyerPreferredModel) whereClause.buyerPreferredModel = buyerPreferredModel as string;
        if (buyerPreferredBodyType) whereClause.buyerPreferredBodyType = buyerPreferredBodyType as string;
        if (buyerPreferredWheelDrive) whereClause.buyerPreferredWheelDrive = buyerPreferredWheelDrive as string;
        if (buyerPreferredGearbox) whereClause.buyerPreferredGearbox = buyerPreferredGearbox as string;
        if (buyerPreferredCondition) whereClause.buyerPreferredCondition = buyerPreferredCondition as string;
        if (buyerPreferredCompletion) whereClause.buyerPreferredCompletion = buyerPreferredCompletion as string;
        if (buyerPreferredColor) whereClause.buyerPreferredColor = buyerPreferredColor as string;
        if (buyerCarReleaseDate) whereClause.buyerCarReleaseDate = buyerCarReleaseDate as string;
        if (buyerMaxMileage) whereClause.buyerMaxMileage = Number(buyerMaxMileage);
        if (buyerMaxPrice) whereClause.buyerMaxPrice = Number(buyerMaxPrice);

        const buyers = await Buyer.findAll({where: whereClause});
        res.status(200).json({data: buyers});
    } catch (error) {
        logger.error('Failed to get buyers by car parameters', error);
        res.status(500).json({message: 'Ошибка при поиске покупателей на авто с заданными параметрами'});
    }
}