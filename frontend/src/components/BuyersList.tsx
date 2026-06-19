import BuyerItem from './BuyerItem';
import type {BuyersListProps} from '../types/types.ts';


export default function BuyersList({buyers, loading, error, onEdit, onDelete}: BuyersListProps) {
    if (loading) {
        return <div className="loading">Загрузка покупателей...</div>;
    }

    if (error) {
        return <div className="error-msg">{error}</div>;
    }

    if (buyers.length === 0) {
        return (
            <div className="empty-state">
                <p>Покупатели не найдены</p>
            </div>
        );
    }

    return (
        <div className="buyers-grid">
            {buyers.map((buyer) => (
                <BuyerItem
                    key={buyer.buyerId}
                    buyer={buyer}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}