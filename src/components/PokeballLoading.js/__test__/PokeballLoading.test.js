import React from "react";
import { render } from "@testing-library/react";
import PokeballLoading from "../PokeballLoading";


const setup = (props = {}) => {
    const renderResult = render(<PokeballLoading {...props} />);

    return {
        ...renderResult,
        image: renderResult.getByAltText('Pokeball Loading'),
    }
};

describe('PokeballLoading', () => {
    test('should render with default props', () => {
        const {container, image} = setup();
        const defaultSize = 200;

        expect(container).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image.width).toBe(defaultSize);
        expect(image.height).toBe(defaultSize);
    });


    test('message should change', () => {
        const {queryByText, rerender} = setup();
        const message = 'Nova message';

        expect(queryByText(message)).not.toBeInTheDocument();

        rerender(<PokeballLoading message={message}/>);

        expect(queryByText(message)).toBeInTheDocument();

    })

    test('image should have correct size', () => {
        const size = 200;
        const {image} = setup({size});

        expect(image.width).toBe(size);
        expect(image.height).toBe(size);
    })
});