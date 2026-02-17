import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const theme = createTheme({
  primaryColor: "blue",
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <MantineProvider theme={theme}>
    <Notifications position="top-right" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>,
);
