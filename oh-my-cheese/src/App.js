import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Pixel Perfect Pizzas"),
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
