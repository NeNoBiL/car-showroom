import {useState, useEffect} from 'react';
import {emptyOrderForm} from '../types/types.ts';
import type {OrderAttributes, BuyerAttributes, CarAttributes, OrderForm} from '../types/types.ts';
import {getOrders, createOrder, updateOrder, deleteOrder} from '../api/orders.api.ts';
import {getCars} from '../api/cars.api.ts';
import {getBuyers} from '../api/buyers.api.ts';
import OrdersList from '../components/OrdersList.tsx';
import OrderFormModal from '../components/OrderFormModal.tsx';


export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderAttributes[]>([]);
    const [cars, setCars] = useState<CarAttributes[]>([]);
    const [buyers, setBuyers] = useState<BuyerAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState<OrderAttributes | null>(null);
    const [form, setForm] = useState<OrderForm>(emptyOrderForm);

    const load = async () => {
        try {
            setLoading(true);
            const [ordersData, carsData, buyersData] = await Promise.all([
                getOrders(),
                getCars(),
                getBuyers(),
            ]);
            setOrders(ordersData);
            setCars(carsData);
            setBuyers(buyersData);
            setError('');
        } catch {
            setError('Не удалось загрузить данные');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const showSuccess = (msg: string) => {
        setSuccess(msg);
        setTimeout(() => setSuccess(''), 3000);
    };

    const openCreate = () => {
        setEditingOrder(null);
        setForm({
            ...emptyOrderForm,
            buyerId: buyers[0]?.buyerId ?? 0,
            carId: cars[0]?.carId ?? 0,
            orderSum: cars[0]?.carPrice ?? 0,
        });
        setShowModal(true);
    };

    const openEdit = (order: OrderAttributes) => {
        setEditingOrder(order);
        setForm({
            buyerId: order.buyerId,
            carId: order.carId,
            orderStatus: order.orderStatus,
            orderDate: order.orderDate,
            orderSum: order.orderSum,
        });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            if (editingOrder) {
                await updateOrder(editingOrder.orderId, {
                    orderStatus: form.orderStatus,
                    orderSum: form.orderSum,
                });
                showSuccess('Заказ обновлён');
            } else {
                await createOrder(form);
                showSuccess('Заказ создан');
            }
            setShowModal(false);
            load();
        } catch {
            setError('Ошибка при сохранении');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Удалить заказ?')) return;
        try {
            await deleteOrder(id);
            showSuccess('Заказ удалён');
            load();
        } catch {
            setError('Ошибка при удалении');
        }
    };

    const handleFieldChange = (key: keyof OrderForm, val: string | number) =>
        setForm(prev => ({...prev, [key]: val}));

    const handleCarSelect = (carId: number, carPrice: number) =>
        setForm(prev => ({...prev, carId, orderSum: carPrice}));

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Заказы</h1>
                <button className="btn-primary" onClick={openCreate}>+ Создать заказ</button>
            </div>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <OrdersList
                orders={orders}
                buyers={buyers}
                cars={cars}
                loading={loading}
                error={error}
                onEdit={openEdit}
                onDelete={handleDelete}
            />

            <OrderFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                form={form}
                buyers={buyers}
                cars={cars}
                onFieldChange={handleFieldChange}
                onCarSelect={handleCarSelect}
                isEditing={!!editingOrder}
            />
        </div>
    );
}