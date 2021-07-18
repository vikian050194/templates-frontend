import { ItemsList } from "./ItemsList";

const App = (rootSelector) => {
    const $root = document.querySelector(rootSelector);
    ItemsList($root);
};

export default App;