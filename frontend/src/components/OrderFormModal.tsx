import type {OrderAttributes, BuyerAttributes, CarAttributes} from '../types/types.ts';
import {OrderStatuses} from '../types/types.ts';
import Modal from '../components/Modal';

type OrderForm = Omit<OrderAttributes, 'orderId'>;

interface OrderFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    form: OrderForm;
    buyers: BuyerAttributes[];
    cars: CarAttributes[];
    onFieldChange: (key: keyof OrderForm, value: string | number) => void;
    onCarSelect: (carId: number, carPrice: number) => void;
    isEditing: boolean;
}

export default function OrderFormModal({
                                           isOpen,
                                           onClose,
                                           onSubmit,
                                           form,
                                           buyers,
                                           cars,
                                           onFieldChange,
                                           onCarSelect,
                                           isEditing
                                       }: OrderFormModalProps) {
    if (!isOpen) return null;

    return (
        <Modal
            title={isEditing ? 'Редактировать заказ' : 'Новый заказ'}
            onClose={onClose}
            onSubmit={onSubmit}
            submitLabel={isEditing ? 'Сохранить изменения' : 'Создать'}
        >
            <div className="form-grid">
                {!isEditing && (
                    <>
                        <div className="form-group">
                            <label>Покупатель *</label>
                            <select
                                value={form.buyerId}
                                onChange={e => onFieldChange('buyerId', Number(e.target.value))}
                            >
                                {buyers.map(b => (
                                    <option key={b.buyerId} value={b.buyerId}>
                                        {b.buyerSurname} {b.buyerName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Автомобиль *</label>
                            <select
                                value={form.carId}
                                onChange={e => {
                                    const id = Number(e.target.value);
                                    const car = cars.find(c => c.carId === id);
                                    onCarSelect(id, car?.carPrice ?? 0);
                                }}
                            >
                                {cars.map(c => (
                                    <option key={c.carId} value={c.carId}>
                                        {c.carBrand} {c.carModel} — {Number(c.carPrice).toLocaleString()} ₽
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Дата заказа *</label>
                            <input
                                type="date"
                                value={form.orderDate}
                                onChange={e => onFieldChange('orderDate', e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Статус *</label>
                    <select
                        value={form.orderStatus}
                        onChange={e => onFieldChange('orderStatus', e.target.value)}
                    >
                        {Object.values(OrderStatuses).map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group full-width">
                    <label>Сумма (₽) *</label>
                    <input
                        type="number"
                        min={0}
                        value={form.orderSum}
                        onChange={e => onFieldChange('orderSum', Number(e.target.value))}
                    />
                </div>
            </div>
        </Modal>
    );
}