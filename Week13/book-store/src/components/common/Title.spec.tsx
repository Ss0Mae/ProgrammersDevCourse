import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import Title from './Title';

describe('Title 컴포넌트 테스트', () => {
    it('renders children', () => {
        render(
            <BookStoreThemeProvider>
                <Title size="medium" color="background">제목 테스트</Title>
            </BookStoreThemeProvider>
        );
        const title = screen.getByText('제목 테스트');
        expect(title).toBeInTheDocument();
    });

    //size props 적용 테스트
    it('renders size props', () => {
        render(
            <BookStoreThemeProvider>
                <Title size="medium" color="background">제목 테스트</Title>
            </BookStoreThemeProvider>
        );
        const title = screen.getByText('제목 테스트');
        expect(title).toHaveStyle('font-size: 1.5rem');
    }
});