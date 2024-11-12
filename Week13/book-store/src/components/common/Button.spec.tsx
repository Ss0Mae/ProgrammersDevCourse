
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import Button from './Button';

describe('Button 컴포넌트 테스트', () => {
    it('renders children', () => {
        render(
            <BookStoreThemeProvider>
                <Button size = "large" scheme = "primary">버튼 테스트</Button>
            </BookStoreThemeProvider>
        );
        const button = screen.getByText('버튼 테스트');
        expect(button).toBeInTheDocument();
    });

});