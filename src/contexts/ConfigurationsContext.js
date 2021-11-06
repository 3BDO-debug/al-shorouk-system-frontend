import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
// apis
import { itemsCategoriesFetcher } from '../_apis_/configurations';

export const ConfigurationsContext = createContext();

export const ConfigurationsProvider = ({ children }) => {
  const [itemsCategories, setItemsCategories] = useState([]);

  useEffect(() => {
    itemsCategoriesFetcher()
      .then((itemsCategoriesResponse) => setItemsCategories(itemsCategoriesResponse))
      .catch((error) => console.log(`items-categories-${error}`));
  }, []);

  return (
    <ConfigurationsContext.Provider value={{ itemsCategoriesState: [itemsCategories, setItemsCategories] }}>
      {children}
    </ConfigurationsContext.Provider>
  );
};

ConfigurationsProvider.propTypes = {
  children: PropTypes.node
};
