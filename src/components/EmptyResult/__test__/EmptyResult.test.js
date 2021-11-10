import React from 'react';
import {render} from '@testing-library/react';
import EmptyResult from "../EmptyResult";

describe('EmptyResult', () => {
    test('should render with default props', () => {
        const {container, getByAltText,getByText} = render(<EmptyResult/>);
        const defaultMessage = 'Oops... Não encontramos nada.';
        const defautlWidth = 200;

        const image = getByAltText('/empty result/i');

        expect(container).toBeInTheDocument();
        expect(getByText(defaultMessage)).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image.width).toBe(defautlWidth);
    });

    test('image should have correct width', () => {
        const width = 150;
        const {getByText} = render(<EmptyResult width={}/>);

        const image = getByText('EmptyResult');
        expect(image.width).toBe(width);
    });

    test('should render with message', () => {
        const message = 'Nova message';
        const {getByText} = render(<EmptyResult message={message}/>);
    })
});