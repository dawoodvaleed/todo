import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/button';

describe('Button Component', () => {
    it('should renders with default props', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByRole('button', { name: 'Click Me' });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-green-600'); // default "primary"
        expect(button).not.toBeDisabled();
    });

    it.each`
    variant        | expectedClass
    ${'primary'}   | ${'bg-green-600'}
    ${'secondary'} | ${'bg-blue-600'}
    ${'danger'}    | ${'bg-red-800'}
`('should applies the correct class for variant "$variant"', ({ variant, expectedClass }) => {
        render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole('button', { name: variant });
        expect(button).toHaveClass(expectedClass);
    });

    it('should trigger onClick', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);

        fireEvent.click(screen.getByRole('button', { name: 'Click' }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should disable button', () => {
        const handleClick = jest.fn();
        render(
            <Button disabled onClick={handleClick}>
                Disabled
            </Button>
        );

        const button = screen.getByRole('button', { name: 'Disabled' });
        expect(button).toBeDisabled();
        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should apply additional className', () => {
        render(<Button className="my-custom-class">Custom</Button>);
        const button = screen.getByRole('button', { name: 'Custom' });

        expect(button).toHaveClass('my-custom-class');
    });
});
