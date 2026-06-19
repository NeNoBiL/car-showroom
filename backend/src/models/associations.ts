import {Order} from './order.model';
import {Buyer} from './buyer.model';
import {Car} from './car.model';


export function setupAssociations(): void {
    Order.belongsTo(Buyer, {foreignKey: 'buyerId', as: 'buyer'});
    Order.belongsTo(Car, {foreignKey: 'carId', as: 'car'});
    Buyer.hasMany(Order, {foreignKey: 'buyerId', as: 'orders'});
    Car.hasMany(Order, {foreignKey: 'carId', as: 'orders'});
}