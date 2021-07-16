import { NodeBuilder } from "./NodeBuilder";

const ColorfulMessage = (message) => {
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

    const h = new NodeBuilder();

    const render = () => {
        const state = getState();

        const element = h.re().div({ class: colors[state.color] }).withText(message).onClick(nextColor).done();

        return element;
    };

    return {
        render
    };
};

export { ColorfulMessage };