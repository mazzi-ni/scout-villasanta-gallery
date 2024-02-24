import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/it";

import Root from "./pages/root.page";
import Home from "./pages/home.page";
import Foto from "./pages/foto.page";
import Contact from "./pages/contatti.page";
import Error404 from "./pages/error.page";

moment.locale("it");

const breakpoints = {
  sm: "20em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

// 3. Extend the theme
const theme = extendTheme({ breakpoints });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: "home",
        element: <Home/>,
      },
      {
        path: "foto",
        element: <Foto/>,
      },
      {
        path: "contatti",
        element: <Contact/>,
      },
    ]
  },
]);


function App() {

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
