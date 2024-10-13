import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (coin) => {
    setFavorites((prevFavorites) => [...prevFavorites, coin]);
  };

  const removeFavorite = (coinId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((coin) => coin.id !== coinId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};