import OrderItem from './OrderItem';
import type {OrdersListProps} from '../types/types.ts';


export default function OrdersList({orders, buyers, cars, loading, error, onEdit, onDelete}: OrdersListProps) {
    if (loading) {
        return <div className="loading">Загрузка заказов...</div>;
    }

    if (error) {
        return <div className="error-msg">{error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="empty-state">
                <p>Заказы не найдены</p>
            </div>
        );
    }

    return (
        <div className="orders-grid">
            {orders.map((order) => {
                const buyer = buyers.find(b => b.buyerId === order.buyerId);
                const car = cars.find(c => c.carId === order.carId);

                return (
                    <OrderItem
                        key={order.orderId}
                        order={order}
                        buyer={buyer}
                        car={car}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
}