import { ColorfulMessage } from "./ColorfulMessage";
import { NodeBuilder } from "./NodeBuilder";

const ColorfulMessagesList = ($root) => {
    let state = {
        messages: ["foo", "bar", "baz"]
    };

    const getState = () => state;

    // const setState = (update) => {
    //     state = Object.assign({}, getState(), update(getState()));
    //     // debounce could improve rendering
    //     render();
    // };

    const h = new NodeBuilder();
    const listBuilder = h.div({ class: "list" });

    const render = () => {
        const state = getState();

        for (let message of state.messages) {
            const cm = new ColorfulMessage(message);
            listBuilder.insert(cm.render());
        }

        listBuilder.done($root);
    };

    render();
};

export { ColorfulMessagesList };