import { ReactNode } from 'react';
import { Button } from '../button';
import { FiX } from 'react-icons/fi';

type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[var(--background)]/80 flex items-center justify-center z-50">
            <div className="bg-[var(--background)] rounded-xl p-6 w-full max-w-md shadow-lg relative border-1">
                {title && <h2 className="text-xl font-bold mb-8">{title}</h2>}
                <Button
                    onClick={onClose}
                    className="absolute top-6 right-6"
                    variant="danger"
                    aria-label="Close modal"
                >
                    <FiX size={24} />
                </Button>
                {children}
            </div>
        </div>
    );
};
