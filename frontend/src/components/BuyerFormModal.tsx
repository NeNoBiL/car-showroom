import Modal from '../components/Modal';
import type {BuyerFormModalProps} from '../types/types.ts';
import {CarBodyTypes, CarWheelDrives, CarGearboxes, CarCompletions, CarConditions, CarColors} from '../types/types.ts';


export default function BuyerFormModal(
    {isOpen, onClose, onSubmit, form, onFieldChange, isEditing}: BuyerFormModalProps) {

    if (!isOpen) return null;

    return (
        <Modal
            title={isEditing ? 'Редактировать покупателя' : 'Новый покупатель'}
            onClose={onClose}
            onSubmit={onSubmit}
            submitLabel={isEditing ? 'Сохранить изменения' : 'Добавить'}
        >
            <div className="form-grid">
                <div className="form-group">
                    <label>Фамилия *</label>
                    <input
                        value={form.buyerSurname}
                        onChange={e => onFieldChange('buyerSurname', e.target.value)}
                        placeholder="Иванов"
                    />
                </div>
                <div className="form-group">
                    <label>Имя *</label>
                    <input
                        value={form.buyerName}
                        onChange={e => onFieldChange('buyerName', e.target.value)}
                        placeholder="Иван"
                    />
                </div>
                <div className="form-group">
                    <label>Отчество</label>
                    <input
                        value={form.buyerPatronymic ?? ''}
                        onChange={e => onFieldChange('buyerPatronymic', e.target.value || null)}
                        placeholder="Иванович"
                    />
                </div>
                <div className="form-group">
                    <label>Телефон *</label>
                    <input
                        value={form.buyerTel}
                        onChange={e => onFieldChange('buyerTel', e.target.value)}
                        placeholder="XX-XX-XX"
                    />
                </div>
                <div className="form-group">
                    <label>Желаемая бренд</label>
                    <input
                        value={form.buyerPreferredBrand ?? ''}
                        onChange={e => onFieldChange('buyerPreferredBrand', e.target.value || null)}
                        placeholder="Toyota"
                    />
                </div>
                <div className="form-group">
                    <label>Желаемая модель</label>
                    <input
                        value={form.buyerPreferredModel ?? ''}
                        onChange={e => onFieldChange('buyerPreferredModel', e.target.value || null)}
                        placeholder="Camry"
                    />
                </div>
                <div className="form-group">
                    <label>Тип кузова</label>
                    <select
                        value={form.buyerPreferredBodyType ?? ''}
                        onChange={e => onFieldChange('buyerPreferredBodyType', e.target.value || null)}
                    >
                        <option value="">— Не важно —</option>
                        {Object.values(CarBodyTypes).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Привод</label>
                    <select
                        value={form.buyerPreferredWheelDrive ?? ''}
                        onChange={e => onFieldChange('buyerPreferredWheelDrive', e.target.value || null)}
                    >
                        <option value="">— Не важно —</option>
                        {Object.values(CarWheelDrives).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>КПП</label>
                    <select
                        value={form.buyerPreferredGearbox ?? ''}
                        onChange={e => onFieldChange('buyerPreferredGearbox', e.target.value || null)}
                    >
                        <option value="">— Не важно —</option>
                        {Object.values(CarGearboxes).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Состояние авто</label>
                    <select
                        value={form.buyerPreferredCondition ?? ''}
                        onChange={e => onFieldChange('buyerPreferredCondition', e.target.value || null)}
                    >
                        <option value="">— Не важно —</option>
                        {Object.values(CarConditions).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Комплектация</label>
                    <select
                        value={form.buyerPreferredCompletion ?? ''}
                        onChange={e => onFieldChange('buyerPreferredCompletion', e.target.value || null)}
                    >
                        <option value="">— Не важно —</option>
                        {Object.values(CarCompletions).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Цвет</label>
                    <select
                        value={form.buyerPreferredColor ?? ''}
                        onChange={e => onFieldChange('buyerPreferredColor', e.target.value || null)}
                    >
                        <option value="">— Не важно —</option>
                        {Object.values(CarColors).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Желаемый год выпуска</label>
                    <input
                        type="date"
                        value={form.buyerCarReleaseDate ?? ''}
                        onChange={e => onFieldChange('buyerCarReleaseDate', e.target.value || null)}
                    />
                </div>
                <div className="form-group">
                    <label>Макс. пробег (км)</label>
                    <input
                        type="number"
                        min={0}
                        value={form.buyerMaxMileage ?? ''}
                        onChange={e => onFieldChange('buyerMaxMileage', e.target.value ? Number(e.target.value) : null)}
                    />
                </div>
                <div className="form-group full-width">
                    <label>Макс. цена (₽)</label>
                    <input
                        type="number"
                        min={0}
                        value={form.buyerMaxPrice ?? ''}
                        onChange={e => onFieldChange('buyerMaxPrice', e.target.value ? Number(e.target.value) : null)}
                    />
                </div>
            </div>
        </Modal>
    );
}