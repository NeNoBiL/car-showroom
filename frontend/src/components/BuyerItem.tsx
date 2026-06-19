import {type BuyerItemProps} from '../types/types.ts';


export default function BuyerItem({buyer, onEdit, onDelete}: BuyerItemProps) {
    return (
        <div className="buyer-card">
            <div className="buyer-card-header">
                <div>
                    <h3 className="buyer-name">
                        {buyer.buyerSurname} {buyer.buyerName}
                        {buyer.buyerPatronymic ? ` ${buyer.buyerPatronymic}` : ''}
                    </h3>
                    <span className="buyer-tel"> {buyer.buyerTel}</span>
                </div>
                <span className="buyer-id">ID: {buyer.buyerId}</span>
            </div>
            <div className="buyer-preferences">
                <div className="pref-item">
                    <span className="pref-label">Авто:</span>
                    <span className="pref-value">
                        {buyer.buyerPreferredBrand || buyer.buyerPreferredModel ?
                            `${buyer.buyerPreferredBrand ?? ''} ${buyer.buyerPreferredModel ?? ''}`.trim() : '—'}
                    </span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">Кузов:</span>
                    <span className="pref-value">{buyer.buyerPreferredBodyType ?? '—'}</span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">Привод:</span>
                    <span className="pref-value">{buyer.buyerPreferredWheelDrive ?? '—'}</span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">КПП:</span>
                    <span className="pref-value">{buyer.buyerPreferredGearbox ?? '—'}</span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">Состояние:</span>
                    <span className="pref-value">{buyer.buyerPreferredCondition ?? '—'}</span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">Цвет:</span>
                    <span className="pref-value">{buyer.buyerPreferredColor ?? '—'}</span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">Макс. пробег:</span>
                    <span className="pref-value">{buyer.buyerMaxMileage ?
                        `${buyer.buyerMaxMileage.toLocaleString()} км` : '—'}</span>
                </div>
                <div className="pref-item">
                    <span className="pref-label">Макс. цена:</span>
                    <span className="pref-value">{buyer.buyerMaxPrice ?
                        `${Number(buyer.buyerMaxPrice).toLocaleString()} ₽` : '—'}</span>
                </div>
            </div>
            <div className="buyer-card-footer">
                <span className="buyer-date">
                    {buyer.buyerCarReleaseDate ? `Год авто: ${buyer.buyerCarReleaseDate}` : 'Год авто: —'}
                </span>
                <div className="buyer-actions">
                    <button className="btn-edit" onClick={() => onEdit(buyer)}>Изменить</button>
                    <button className="btn-danger" onClick={() => onDelete(buyer.buyerId)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}