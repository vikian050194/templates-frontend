import { ColorfulMessagesList } from "./ColorfulMessagesList";

const App = (rootSelector) => {
    const $root = document.querySelector(rootSelector);
    ColorfulMessagesList($root);
};

export default App;