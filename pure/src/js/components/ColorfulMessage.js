import { NodeBuilder } from "./NodeBuilder";

const ColorfulMessage = ($root, message) => {
    const colors = ["a", "b", "c"];
    let state = { color: 0 };

    const getState = () => state;

    const setState = (update) => {
        state = Object.assign({}, getState(), update(getState()));
        // debounce could improve rendering
        render();
    };

    const nextColor = () => {
        setState((state) => {
            return {
                color: (state.color + 1) % colors.length
            };
        });
    };

    const render = () => {
        const state = getState();
        const h = new NodeBuilder();

        h.div({ class: colors[state.color] }).withText(message).onClick(nextColor).done($root);
    };

    render();
};

export { ColorfulMessage };