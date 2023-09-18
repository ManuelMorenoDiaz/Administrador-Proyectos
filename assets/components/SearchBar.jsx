import React from 'react';
import { TextInput } from 'react-native';

 const SearchBar = () => {
    return (
      <TextInput
        style={{ backgroundColor: 'white', borderRadius: 2, width: '90%'}}
        placeholder="Buscar..."
        onSubmitEditing={() => {
          // Lógica para realizar la búsqueda
        }}
      />
    );
  };

  export default SearchBar;