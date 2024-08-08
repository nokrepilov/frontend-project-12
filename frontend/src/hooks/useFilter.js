import { useContext } from 'react';

import FilterBadWordsContext from '../contexts/FilterBadWordsContext.js';

const useFilter = () => useContext(FilterBadWordsContext);

export default useFilter;
