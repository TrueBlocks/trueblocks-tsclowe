import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { BrowserOpenURL } from "@wailsjs/runtime/runtime";
import { initOS } from "@trueblocks/ui";
import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

initOS({ openURL: BrowserOpenURL });

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
