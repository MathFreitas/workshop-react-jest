import React, { useContext } from "react";
import {render} from "@testing-library/react";
import DeckFormProvider, { DeckFormContext } from "../DeckFormProvider";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router";
import pikachuMock from '../../__mocks__/card-builder';

const DeckFormTestComponent = ({card}) => {
    const {
        deckName,
        deckCards,
        updateDeckName,
        addCard,
        removeCard,
        saveDeck,
        submitted
    } = useContext(DeckFormContext);

    return (
        <>
            <div>{deckName}</div>
            <div>Was submitted{submitted}</div>
            <input placeholder={'Placeholder'} onChange={(evt) => updateDeckName(evt.target.value)} />
            <button onClick={() => addCard(card)} >Add</button>
            <button onClick={() => removeCard(card)} >Remove</button>
            <button onClick={saveDeck} >Save</button>

            {
                deckCards.map(c => (<div key={c.id}>{c.id} {c.name}</div>))
            }
         </>
    )
}

const setup = (initialState, deckId) => {
    const store = storeBuilder(initialState);
    const card = pikachuMock;

    const renderResult = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/deck/${deckId}`]} initialIndex={0}>
                <Route 
                    path={'/deck/:id'}
                    exact={true}
                    component={() => (
                        <DeckFormProvider>
                            <DeckFormTestComponent card={} />
                        </DeckFormProvider>
                    )}
                />
            </MemoryRouter>
        </Provider>
    );

    return {
        ...renderResult,
        card,
        btnAdd:renderResult.getByText('Add'),
        btnRemove:renderResult.getByText('Remove'),
        btnSave:renderResult.getByText('Save'),
        input: renderResult.getByPlaceholder()
    }
};

describe('DeckFormProvider', () => {
    test('should render with default props', () => {
        const {container} = setup();

        expect(container).toBeInTheDocument();
    });
});