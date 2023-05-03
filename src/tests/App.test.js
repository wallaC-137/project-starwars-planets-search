import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import planetsFiles from '../temp/planetsFiles.json'

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => planetsFiles
  }))
})

afterEach(() => {
  global.fetch.mockRestore()
})

test('I am your test', () => {
  render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>
  );
 
  const inputText = screen.getByRole('textbox');
  userEvent.type(inputText, 'tatooine')
});

test('I am your test', () => {
  render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>
  );

  const coluna = screen.getByTestId("column-filter")
  const colunaText = ['diameter']
 
  userEvent.selectOptions(coluna, colunaText)

  const compara = screen.getByTestId("comparison-filter")
  const comparaText = ['menor que']
  userEvent.selectOptions(compara, comparaText)


  const valor = screen.getByTestId("value-filter")
  userEvent.type(valor, '8900')

  const btn = screen.getByRole('button', {  name: /filtrar/i})
  userEvent.click(btn)

  const btnRemoveAll = screen.getByRole('button', {  name: /remover todas filtragens/i})
  userEvent.click(btnRemoveAll)



  const colunaText2 = ['population']
  
  userEvent.selectOptions(coluna, colunaText2)

  const comparaText2 = ['maior que']
  userEvent.selectOptions(compara, comparaText2)

  const valor2 = screen.getByTestId("value-filter")
  userEvent.type(valor2, '1000000')

  userEvent.click(btn)

  const btnRemoveOne = screen.getByRole('button', {  name: /x/i})
  userEvent.click(btnRemoveOne)
  userEvent.click(btnRemoveAll)


  const colunaText3 = ['rotation_period']

  userEvent.selectOptions(coluna, colunaText3)

  const comparaText3 = ['igual a']
  userEvent.selectOptions(compara, comparaText3)

  userEvent.type(valor, '12')

  userEvent.click(btn)

  userEvent.click(btnRemoveAll)

});

test('', async () => {
  render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>
  )

  await waitFor(() => {
    expect(screen.getByAltText(/tatooine/i)).toBeInTheDocument();
  })
})