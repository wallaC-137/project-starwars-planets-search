import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

function TextFilter() {
  const { planets, setFilteredText } = useContext(PlanetsContext);

  const [textFilter, setTextFilter] = useState(''); // string digitada no input de texto

  /**
     * Responsável por filtrar o array original usando o texto do input e salvar esse valor no estado 'filteredText'
     */
  const applyFilterText = () => {
    const algo = planets?.filter((planet) => planet.name
      .toLowerCase().includes(textFilter.toLowerCase()));
    setFilteredText(algo);
  };

  useEffect(() => {
    function data() {
      applyFilterText();
    }
    data();
  }, [textFilter]);

  return (
    <form>
      <input
        type="text"
        name="filter-text"
        id="filter-text"
        placeholder="Digite algo para filtrar"
        onChange={ ({ target }) => setTextFilter(target.value) }
        value={ textFilter }
        data-testid="name-filter"
      />
    </form>
  );
}

export default TextFilter;
