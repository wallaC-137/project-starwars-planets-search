import { useContext, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

const filterOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function ThreeFilter() {
  const [arrayOptions, setArrayOptions] = useState(filterOptions); // é o state responsável por renderizar as opções da coluna
  const [coluna, setColuna] = useState(arrayOptions[0]); // responsável pelo valor selecionado na coluna
  const [compara, setCompara] = useState('maior que'); // responsável pelo comparador selecionado
  const [valor, setValor] = useState('0'); // responsável pelo valor que será usado para comparar

  const {
    renderPlanets, // é o estado responsável por fornecer os dados para a tabela que é exibida na tela
    setSelectFilter, // 'seta' um novo filtro selecionado

    planets,

    filtrosSalvos,
    setFiltrosSalvos,
  } = useContext(PlanetsContext);

  const removeFilterOptions = (rem) => {
    const algo = arrayOptions?.filter((opt) => opt !== rem);
    setArrayOptions(algo);
    setColuna(algo[0]);
  };

  const applyFilter = () => {
    let newArray = [];
    if (compara === 'maior que') {
      newArray = renderPlanets
        ?.filter((planet) => Number(planet[coluna] > Number(valor)));
    }

    if (compara === 'menor que') {
      newArray = renderPlanets
        ?.filter((planet) => Number(planet[coluna] < Number(valor)));
    }

    if (compara === 'igual a') {
      newArray = renderPlanets
        ?.filter((planet) => Number(planet[coluna]) === Number(valor));
    }
    setSelectFilter(newArray);
    removeFilterOptions(coluna);
    setFiltrosSalvos([...filtrosSalvos, { coluna, compara, valor }]);
  };

  const tes = (aq) => {
    let newArray = [];
    aq?.forEach((element) => {
      if (element.compara === 'maior que') {
        newArray = planets
          ?.filter((planet) => Number(planet[element.coluna]) > Number(element.valor));
      }

      if (element.compara === 'menor que') {
        newArray = planets
          ?.filter((planet) => Number(planet[element.coluna]) < Number(element.valor));
      }

      if (element.compara === 'igual a') {
        newArray = planets
          ?.filter((planet) => Number(planet[element.coluna]) === Number(element.valor));
      }
    });
    setSelectFilter(newArray);
  };

  const aw = (al) => {
    const wa = filtrosSalvos?.filter((aa) => aa.coluna !== al);
    setFiltrosSalvos(wa);
    tes(wa);
  };

  return (
    <form>
      <label htmlFor="coluna">
        <select
          name="filter-options"
          id="coluna"
          onChange={ ({ target }) => setColuna(target.value) }
          value={ coluna }
          data-testid="column-filter"
        >
          {arrayOptions?.map((opt) => (
            <option key={ opt } value={ opt }>{opt}</option>
          ))}
        </select>
      </label>

      <label htmlFor="compara">
        <select
          name="compara"
          id="compara"
          value={ compara }
          onChange={ ({ target }) => setCompara(target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        name="valor"
        id="valor"
        value={ valor }
        onChange={ ({ target }) => setValor(target.value) }
        data-testid="value-filter"
        style={ { width: '50px' } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => applyFilter() }
      >
        filtrar
      </button>
      {filtrosSalvos?.map((opt) => (
        <div
          key={ opt.coluna }
          data-testid="filter"
        >
          {`${opt.coluna} ${opt.compara} ${opt.valor}`}
          <button type="button" onClick={ () => aw(opt.coluna) }>X</button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setSelectFilter([]);
          setArrayOptions(filterOptions);
          setFiltrosSalvos([]);
        } }
      >
        Remover todas filtragens
      </button>
    </form>
  );
}

export default ThreeFilter;
