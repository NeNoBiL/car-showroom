import Modal from '../components/Modal';
import type {BuyerSearchModalProps} from '../types/types.ts';
import {CarBodyTypes, CarWheelDrives, CarGearboxes, CarCompletions, CarConditions, CarColors} from '../types/types.ts';


export default function BuyerSearchModal(
    {onClose, onSubmit, onFieldChange, buyerSearchParams}: BuyerSearchModalProps) {
    return (
        <Modal
            title="Поиск покупателей по параметрам авто"
            onClose={onClose}
            onSubmit={onSubmit}
            submitLabel="Найти"
        >
            <div className="form-grid">
                <div className="form-group">
                    <label>Бренд</label>
                    <input
                        value={buyerSearchParams.buyerPreferredBrand ?? ''}
                        onChange={e => onFieldChange('buyerPreferredBrand', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Модель</label>
                    <input
                        value={buyerSearchParams.buyerPreferredModel ?? ''}
                        onChange={e => onFieldChange('buyerPreferredModel', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Тип кузова</label>
                    <select
                        value={buyerSearchParams.buyerPreferredBodyType ?? ''}
                        onChange={e => onFieldChange('buyerPreferredBodyType', e.target.value)}
                    >
                        <option value="">— Любой —</option>
                        {Object.values(CarBodyTypes).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Привод</label>
                    <select
                        value={buyerSearchParams.buyerPreferredWheelDrive ?? ''}
                        onChange={e => onFieldChange('buyerPreferredWheelDrive', e.target.value)}
                    >
                        <option value="">— Любой —</option>
                        {Object.values(CarWheelDrives).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>КПП</label>
                    <select
                        value={buyerSearchParams.buyerPreferredGearbox ?? ''}
                        onChange={e => onFieldChange('buyerPreferredGearbox', e.target.value)}
                    >
                        <option value="">— Любой —</option>
                        {Object.values(CarGearboxes).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Состояние</label>
                    <select
                        value={buyerSearchParams.buyerPreferredCondition ?? ''}
                        onChange={e => onFieldChange('buyerPreferredCondition', e.target.value)}
                    >
                        <option value="">— Любое —</option>
                        {Object.values(CarConditions).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Комплектация</label>
                    <select
                        value={buyerSearchParams.buyerPreferredCompletion ?? ''}
                        onChange={e => onFieldChange('buyerPreferredCompletion', e.target.value)}
                    >
                        <option value="">— Любая —</option>
                        {Object.values(CarCompletions).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Цвет</label>
                    <select
                        value={buyerSearchParams.buyerPreferredColor ?? ''}
                        onChange={e => onFieldChange('buyerPreferredColor', e.target.value)}
                    >
                        <option value="">— Любой —</option>
                        {Object.values(CarColors).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Желаемый год выпуска</label>
                    <input
                        type="date"
                        value={buyerSearchParams.buyerCarReleaseDate ?? ''}
                        onChange={e => onFieldChange('buyerCarReleaseDate', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Макс. пробег (км)</label>
                    <input
                        type="number"
                        min={0}
                        value={buyerSearchParams.buyerMaxMileage ?? ''}
                        onChange={e => onFieldChange('buyerMaxMileage', e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>
                <div className="form-group full-width">
                    <label>Макс. цена (₽)</label>
                    <input
                        type="number"
                        min={0}
                        value={buyerSearchParams.buyerMaxPrice ?? ''}
                        onChange={e => onFieldChange('buyerMaxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>
            </div>
        </Modal>
    );
}