import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/components/modal';

describe('Modal Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderModal = (isOpen: boolean, title: string = "Test Modal") => {
        return render(
            <Modal title={title} isOpen={isOpen} onClose={mockOnClose}>
                <div>Modal Content</div>
            </Modal>
        );
    };

    it('should render the modal when isOpen is true', () => {
        renderModal(true);
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('should not render the modal when isOpen is false', () => {
        renderModal(false);
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
        renderModal(true);
        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close the modal when clicking inside the modal content', () => {
        renderModal(true);
        const modalTitle = screen.getByText('Test Modal');
        fireEvent.click(modalTitle);
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
