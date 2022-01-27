import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddIce from './AddIce';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { categories, Ice } from 'shared';

const testDate: Ice = {
  name: 'New Ice',
  categorie: 'Frucht-Eis',
  ingredients: ['Milch', 'Kakao'],
  allergenics: 'everything',
  nutritionalValue: 123,
  price: 456,
};
describe('AddIce', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('submitting "Bourbon Vanille" will alert "Eissorte bereits angelegt"', async () => {
    const response = new Response();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ...response,
        ok: false,
        status: 409,
      })
    );

    render(
      <HashRouter>
        <AddIce />
      </HashRouter>
    );

    const name = screen.getByText('Name');
    userEvent.type(name, 'Bourbon Vanille');

    const submitButton = screen.getByText('Hinzufügen');
    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Eissorte bereits angelegt');
  });

  test('submitting invalid Data will alert "Eissorte konnte nicht angelegt werden"', async () => {
    const response = new Response();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ...response,
        ok: false,
        status: 400,
      })
    );

    render(
      <HashRouter>
        <AddIce />
      </HashRouter>
    );
    const submitButton = screen.getByText('Hinzufügen');
    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Eissorte konnte nicht angelegt werden');
  });

  test('fields are fillable and correct data will create ice and navigate', async () => {
    const response = new Response();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ...response,
        ok: true,
        status: 200,
      })
    );
    global.fetch = fetchMock;

    render(
      <HashRouter>
        <AddIce />
      </HashRouter>
    );
    const name = screen.getByText('Name');

    const allergenics = screen.getByText('Lebensmittelunverträglichkeiten');
    const nutritionalValue = screen.getByText('Nährwert');
    const price = screen.getByText('VK Preis');

    userEvent.type(name, testDate.name);
    // react select is weird !!!
    // not nice, since its implementation detail
    // parent has the provided id and 2 inputs, the one that is conneted to the label is the wrong one.
    // So we have to search the parent for the input
    const categorie = document.getElementById('categorie');
    const categorieInputs = categorie?.querySelectorAll('input');
    const firstCategoryInput = categorieInputs && categorieInputs.length >= 1 && categorieInputs[0];

    if (firstCategoryInput && testDate.categorie) {
      // klick on resolved input, hence the id, to open dropdown, then select an option
      fireEvent.focus(firstCategoryInput);
      fireEvent.keyDown(firstCategoryInput, { key: 'ArrowDown', code: 40 });
      userEvent.click(screen.getByText(testDate.categorie));
    }

    const ingredients = document.getElementById('ingredients');
    const ingredientsInputs = ingredients?.querySelectorAll('input');
    const firstIngredientInput =
      ingredientsInputs && ingredientsInputs.length >= 1 && ingredientsInputs[0];

    testDate.ingredients.forEach((ingredient) => {
      if (firstIngredientInput && ingredient) {
        // klick on resolved input, hence the id, to open dropdown, then select an option
        fireEvent.focus(firstIngredientInput);
        fireEvent.keyDown(firstIngredientInput, { key: 'ArrowDown', code: 40 });
        userEvent.click(screen.getByText(ingredient));
      }
    });
    // end of weird

    userEvent.type(allergenics, testDate.allergenics);
    userEvent.type(nutritionalValue, testDate.nutritionalValue?.toString() || '');
    userEvent.type(price, testDate.price?.toString() || '');

    const submitButton = screen.getByText('Hinzufügen');
    await act(async () => {
      userEvent.click(submitButton);
    });

    // no failure
    expect(alertMock).toHaveBeenCalledTimes(0);

    // fetch using the data we inserted, thus controlling if inputs were correct
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/addIce',
      expect.objectContaining({ body: JSON.stringify(testDate) })
    );

    // routing to list
    expect(window.location.pathname).toEqual('/');
  });
});
