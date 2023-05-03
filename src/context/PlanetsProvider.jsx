import { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  const [renderPlanets, setRenderPlanets] = useState([]); // estado que será renderizado na tabela
  const [planets, setPlanets] = useState([]); // estado recebido da API
  const [filteredText, setFilteredText] = useState([]); // estado filtrado pelo input de texto
  const [selectFilter, setSelectFilter] = useState([]); // estado recebido pelos filtros select
  const [filtrosSalvos, setFiltrosSalvos] = useState([]);

  /**
   * Essa função recebe 2 parâmetros para remover uma determinada chave de um objeto dentro de um array
   * @param {*} array - recebe um array para percorrer e remover determinada chave
   * @param {*} chave - recebe a chave que deverá ser removida do objeto presente no array
   * @returns - remove a chave do array em questão
   */
  const removeKeyArray = (array, chave) => {
    const newArray = array?.map((element) => delete element[chave]);
    return newArray;
  };

  /**
   * Função responsavel por executar o fetch para API, chamar a função 'removeKeyArray' e 'setar' o resultado em 'planets'
   */
  const fetchApi = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const response = await request.json();
    removeKeyArray(response.results, 'residents'); // temporario enquanto estou sem internet
    console.log(response.results);
    if (planets.length === 0) setRenderPlanets(response.residents);
    setPlanets(response.results);
    // setRenderPlanets(response.residents);
  };

  /**
   * responsável por gerenciar o estado principal para renderização
   * @returns - caso haja algo no input de texto o array filtrado será renderizado, se não o array original que será
   */
  const test = () => {
    if (filtrosSalvos.length > 0) return setRenderPlanets(selectFilter);
    if (filteredText.length > 0) return setRenderPlanets(filteredText);
    return setRenderPlanets(planets);
  };

  useEffect(() => {
    fetchApi();
    test();
  }, [filteredText, renderPlanets, selectFilter, filtrosSalvos]);

  const context = useMemo(() => ({
    planets,
    setPlanets,
    filteredText,
    setFilteredText,
    renderPlanets,
    setRenderPlanets,
    selectFilter,
    setSelectFilter,
    filtrosSalvos,
    setFiltrosSalvos,
  }), [
    planets, setPlanets,
    filteredText, setFilteredText,
    renderPlanets, setRenderPlanets,
    selectFilter, setSelectFilter,
    filtrosSalvos, setFiltrosSalvos,
  ]);
  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default PlanetsProvider;
