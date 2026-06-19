import type {OrderItemProps} from '../types/types.ts';
import {statusBadge} from '../types/types.ts';


export default function OrderItem({order, buyer, car, onEdit, onDelete}: OrderItemProps) {
    const buyerName = buyer ? `${buyer.buyerSurname} ${buyer.buyerName}` : `ID: ${order.buyerId}`;
    const carName = car ? `${car.carBrand} ${car.carModel}` : `ID: ${order.carId}`;

    return (
        <div className="order-card">
            <div className="order-card-header">
                <div>
                    <h3 className="order-id">Заказ #{order.orderId}</h3>
                    <span className="order-date">{order.orderDate}</span>
                </div>
                <span className={statusBadge[order.orderStatus]}>
          {order.orderStatus}
        </span>
            </div>

            <div className="order-details">
                <div className="detail-item">
                    <span className="detail-label">Покупатель</span>
                    <span className="detail-value">{buyerName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Автомобиль</span>
                    <span className="detail-value">{carName}</span>
                </div>
            </div>

            <div className="order-card-footer">
                <span className="order-sum">{Number(order.orderSum).toLocaleString()} ₽</span>
                <div className="order-actions">
                    <button className="btn-edit" onClick={() => onEdit(order)}>Изменить</button>
                    <button className="btn-danger" onClick={() => onDelete(order.orderId)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}