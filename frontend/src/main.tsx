import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import App from './App';

import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
