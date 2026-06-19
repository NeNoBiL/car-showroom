import {Request, Response} from 'express';
import {Order} from '../models/order.model';
import {Buyer} from '../models/buyer.model';
import {Car} from '../models/car.model';
import {createLogger} from '../utils/logger';

const logger = createLogger('order.controller');

export async function createOrder(req: Request, res: Response): Promise<void> {
    logger.info('Creating order');

    const {
        buyerId,
        carId,
        orderStatus,
        orderDate,
        orderSum,
    } = req.body;

    if (!buyerId || !carId || !orderStatus || !orderDate || !orderSum) {
        res.status(400).json({message: 'Заполните все обязательные поля'});
        return;
    }

    try {
        const buyer = await Buyer.findByPk(buyerId);
        const car = await Car.findByPk(carId);  // ← было Buyer.findByPk — критическая ошибка

        if (!buyer || !car) {
            res.status(404).json({message: 'Покупатель или автомобиль не найден'});
            return;
        }

        const order = await Order.create({
            buyerId,
            carId,
            orderStatus,
            orderDate,
            orderSum,
        });

        res.status(201).json({data: order});
    } catch (error) {
        logger.error('Failed to create order', error);
        res.status(500).json({message: 'Ошибка при создании заказа'});
    }
}

export async function getOrders(req: Request, res: Response): Promise<void> {
    logger.info('Getting orders');

    try {
        const orders = await Order.findAll({
            include: [
                {model: Buyer, as: 'buyer'},
                {model: Car, as: 'car'},
            ],
        });

        res.status(200).json({data: orders});
    } catch (error) {
        logger.error('Failed to get orders', error);
        res.status(500).json({message: 'Ошибка при получении заказов'});
    }
}

export async function getOrderById(req: Request, res: Response): Promise<void> {
    logger.info('Getting order by id');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    try {
        const order = await Order.findByPk(Number(id), {
            include: [
                {model: Buyer, as: 'buyer'},
                {model: Car, as: 'car'},
            ],
        });

        if (!order) {
            res.status(404).json({message: 'Заказ не найден'});
            return;
        }

        res.status(200).json({data: order});
    } catch (error) {
        logger.error('Failed to get order by id', error);
        res.status(500).json({message: 'Ошибка при получении заказа'});
    }
}

export async function updateOrder(req: Request, res: Response): Promise<void> {
    logger.info('Updating order');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    const {orderStatus, orderSum} = req.body;

    if (!orderStatus && !orderSum) {
        res.status(400).json({message: 'Передайте хотя бы одно поле для обновления'});
        return;
    }

    try {
        const order = await Order.findByPk(Number(id));

        if (!order) {
            res.status(404).json({message: 'Заказ не найден'});
            return;
        }

        await order.update({orderStatus, orderSum});

        res.status(200).json({data: order});
    } catch (error) {
        logger.error('Failed to update order', error);
        res.status(500).json({message: 'Ошибка при обновлении заказа'});
    }
}

export async function deleteOrder(req: Request, res: Response): Promise<void> {
    logger.info('Deleting order');

    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({message: 'Некорректный идентификатор'});
        return;
    }

    try {
        const order = await Order.findByPk(Number(id));

        if (!order) {
            res.status(404).json({message: 'Заказ не найден'});
            return;
        }

        await order!.destroy();
        res.status(200).json({message: 'Заказ успешно удалён'});
    } catch (error) {
        logger.error('Failed to delete order', error);
        res.status(500).json({message: 'Ошибка при удалении заказа'});
    }
}