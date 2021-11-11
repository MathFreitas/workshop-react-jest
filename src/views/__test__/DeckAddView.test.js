import React from "react";
import {render, wait} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { Provider } from "react-redux";
import axiosMock from "../../__mocks__/axios-mock";

import DeckAddView from "../DeckAddView";
import { storeBuilder } from "../../__mocks__/store-builder";

const setup = (props = {}) => {
    const store = storeBuilder();

    const renderResult = render(
        <Provider store={store}>
            <MemoryRouter>
                <Route path={'/'} component={DeckAddView}/>
            </MemoryRouter>
        </Provider>

    );

    return {
        ...renderResult,
        store,
        emptyMessage: 'Oops... Não encontramos nada.',
        input: renderResult.getByPlaceholderText('Pesquise...'),
        btnAdd: renderResult.getByText('Salvar Baralho')
    };
};

const mockCardsResponse = (cards) => {
    axiosMock.get.mockResolvedValue({
        data: {
            cards
        }
    })
};

describe('DeckAddView', () => {
    test('should render with default props', async () => {
        mockCardsResponse();

        const {container, queryByText, emptyMessage, input, btnAdd} = setup();

        await wait(undefined,{timeout: 0});

        expect(container).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(btnAdd).toBeInTheDocument();
        expect(queryByText(emptyMessage)).toBeInTheDocument();
    
    });
});