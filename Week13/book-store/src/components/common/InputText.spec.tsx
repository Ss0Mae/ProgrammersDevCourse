import { render, screen } from '@testing-library/react';
import React from 'react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './inputText';

describe('InputText 컴포넌트 테스트', () => {
    it('renders children', () => {
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력" />
            </BookStoreThemeProvider>
        );
        const inputText = screen.getByPlaceholderText('여기에 입력');
        expect(inputText).toBeInTheDocument();
    });

    it('forwardRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력" ref={ref} />
            </BookStoreThemeProvider>
        );
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    })
});