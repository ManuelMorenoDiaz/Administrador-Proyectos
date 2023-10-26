// ProjectContext.js
import React, { createContext, useContext, useReducer } from 'react';

const ProjectContext = createContext();

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project];
    default:
      return state;
  }
};

export const ProjectProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(projectReducer, []);

  return (
    <ProjectContext.Provider value={{ projects, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};
