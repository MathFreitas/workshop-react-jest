import React from "react";
import {render, wait, fireEvent} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { Provider } from "react-redux";
import axiosMock from "../../__mocks__/axios-mock";
import DeckAddView from "../DeckAddView";
import { storeBuilder } from "../../__mocks__/store-builder";
import {pikachuMock, squirtleMock } from "../../__mocks__/card-builder"

jest.useFakeTimers();

const setup = (props = {}) => {
    jest.clearAllMocks();

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

    test('should render cards', async () => {
        const cards = [pikachuMock, squirtleMock];

        mockCardsResponse(cards);

        const {getByAltText} = setup();

        await wait(undefined, {timeout: 0});

        cards.forEach((card) => {
            expect(getByAltText(`${card.id}-${card.name}`)).toBeInTheDocument();
        });
    });

    test('should render loading', async () => {
        const {getByAltText} = setup();

        expect(getByAltText('Pokeball Loading')).toBeInTheDocument();
    });

    test('should search', async () => {
        const query = 'picles';
        const {input} = setup();

        fireEvent.change(input, {target: {value: query}});

        jest.runAllTimers();

        expect(axiosMock.get).toHaveBeenCalledTimes(2);
        expect(axiosMock.get).toHaveBeenCalledWith(`/cards?page=1&name=${query}&pageSize=27`);
    });
});