// src/App.tsx
import React from 'react';
import TodoList from './TodoList.tsx';
import { CssBaseline, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <TodoList />
      </Container>
    </>
  );
};

export default App;