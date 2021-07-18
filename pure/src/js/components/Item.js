// import { ItemModel } from "../models";
import NodeBuilder from "./NodeBuilder";

const Item = ($root, {
    id,
    description,
    isCompleted
}) => {

    let state = {
        description,
        isCompleted
    };

    const getState = () => state;

    const setState = (update) => {
        state = Object.assign({}, getState(), update(getState()));
        // debounce could improve rendering
        render();
    };

    const toggle = () => {
        setState((state) => {
            return {
                isCompleted: !state.isCompleted
            };
        });
    };

    const itemBuilder = new NodeBuilder($root);

    const render = () => {
        const state = getState();
        const className = state.isCompleted ? "complete" : "incomplete";
        itemBuilder.div({ class: className, id }).withText(description).onClick(toggle).done();
    };

    return {
        render
    };
};

export default Item;