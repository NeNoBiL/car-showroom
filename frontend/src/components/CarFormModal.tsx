import type {CarFormModalProps} from '../types/types.ts';
import {CarBodyTypes, CarWheelDrives, CarGearboxes, CarCompletions, CarConditions, CarColors} from '../types/types.ts';
import Modal from '../components/Modal';


export default function CarFormModal({isOpen, onClose, onSubmit, form, onFieldChange, isEditing}: CarFormModalProps) {
    if (!isOpen) return null;

    return (
        <Modal
            title={isEditing ? 'Редактировать автомобиль' : 'Новый автомобиль'}
            onClose={onClose}
            onSubmit={onSubmit}
            submitLabel={isEditing ? 'Сохранить изменения' : 'Добавить'}
        >
            <div className="form-grid">
                <div className="form-group">
                    <label>Бренд *</label>
                    <input value={form.carBrand} onChange={e => onFieldChange('carBrand', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Модель *</label>
                    <input value={form.carModel} onChange={e => onFieldChange('carModel', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Дата выпуска *</label>
                    <input type="date" value={form.carReleaseDate ?? ''}
                           onChange={e => onFieldChange('carReleaseDate', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Состояние *</label>
                    <select value={form.carCondition} onChange={e => onFieldChange('carCondition', e.target.value)}>
                        {Object.values(CarConditions).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Пробег (км) *</label>
                    <input type="number" value={form.carMileage}
                           onChange={e => onFieldChange('carMileage', Number(e.target.value))} min={0}/>
                </div>
                <div className="form-group">
                    <label>Тип кузова *</label>
                    <select value={form.carBodyType} onChange={e => onFieldChange('carBodyType', e.target.value)}>
                        {Object.values(CarBodyTypes).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Привод *</label>
                    <select value={form.carWheelDrive} onChange={e => onFieldChange('carWheelDrive', e.target.value)}>
                        {Object.values(CarWheelDrives).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Коробка передач *</label>
                    <select value={form.carGearbox} onChange={e => onFieldChange('carGearbox', e.target.value)}>
                        {Object.values(CarGearboxes).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Комплектация *</label>
                    <select value={form.carCompletion} onChange={e => onFieldChange('carCompletion', e.target.value)}>
                        {Object.values(CarCompletions).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Цвет *</label>
                    <select value={form.carColor} onChange={e => onFieldChange('carColor', e.target.value)}>
                        {Object.values(CarColors).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Объём двигателя (л) *</label>
                    <input type="number" step="0.1" min="0.1" max="9.9" value={form.carEngineCapacity}
                           onChange={e => onFieldChange('carEngineCapacity', Number(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label>Мощность (л.с.) *</label>
                    <input type="number" min="1" max="2000" value={form.carHorsePower}
                           onChange={e => onFieldChange('carHorsePower', Number(e.target.value))}/>
                </div>
                <div className="form-group full-width">
                    <label>Цена (₽) *</label>
                    <input type="number" min="0" value={form.carPrice}
                           onChange={e => onFieldChange('carPrice', Number(e.target.value))}/>
                </div>
            </div>
        </Modal>
    );
}