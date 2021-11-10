import React from 'react';
import {render} from '@testing-library/react';
import EmptyResult from "../EmptyResult";

const setup = (props = {}) => {
    const renderResult = render(<EmptyResult {...props} />);

    return {
        image: renderResult.getByAltText('/empty result/i'),
        ...renderResult,
        
    }
};

describe('EmptyResult', () => {
    test('should render with default props', () => {
        const {container, getByText, image} = setup();
        const defaultMessage = 'Oops... Não encontramos nada.';
        const defautlWidth = 200;


        expect(container).toBeInTheDocument();
        expect(getByText(defaultMessage)).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image.width).toBe(defautlWidth);
    });

    test('image should have correct width', () => {
        const width = 150;
        const {image} = setup({width});

        expect(image.width).toBe(width);
    });

    test('should render with message', () => {
        const message = 'Nova message';
        const {getByText} = setup({message});

        expect(getByText(message)).toBeInTheDocument();
    })
});