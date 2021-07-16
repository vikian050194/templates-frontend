import { ColorfulMessage } from "./ColorfulMessage";

const App = (rootSelector) => {
    const $root = document.querySelector(rootSelector);
    ColorfulMessage($root, "Hello, World!");
};

export default App;