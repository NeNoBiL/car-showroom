import type {ReactNode} from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    onSubmit: () => void;
    submitLabel?: string;
    children: ReactNode;
}

export default function Modal({title, onClose, onSubmit, submitLabel = 'Сохранить', children}: ModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Отмена</button>
                    <button className="btn-primary" onClick={onSubmit}>{submitLabel}</button>
                </div>
            </div>
        </div>
    );
}