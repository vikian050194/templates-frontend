import Item from "./Item";
// import { ItemModel } from "../models";
import NodeBuilder from "./NodeBuilder";

class ItemModel {
    constructor(id, description, isCompleted) {
        this.id = id;
        this.description = description;
        this.isCompleted = isCompleted;
    }
}

const ItemsList = ($root) => {
    let state = {
        items: [
            new ItemModel(1, "foo", false),
            new ItemModel(2, "bar", false),
            new ItemModel(3, "baz", true)
        ]
    };

    const getState = () => state;

    // const setState = (update) => {
    //     state = Object.assign({}, getState(), update(getState()));
    //     // debounce could improve rendering
    //     render();
    // };

    const wrapperBuilder = new NodeBuilder($root);
    const $list = wrapperBuilder.div({ class: "list" }).done();

    const headerBuilder = new NodeBuilder($list);
    headerBuilder.h1().withText("To-do list").done();

    // const listBuilder = new NodeBuilder();

    // const onItemClick = (targetItemId) => {
    //     setState(({ items }) => {
    //         const item = items.find(({ id }) => targetItemId === id);
    //         const index = items.indexOf(item);
    //         const updatedItems = [
    //             ...items.slice(0, index),
    //             new ItemModel(item.id, item.description, !item.isCompleted),
    //             ...items.slice(index)
    //         ];
    //         return {
    //             items: updatedItems
    //         };
    //     });
    // };

    const render = () => {
        const state = getState();

        for (let item of state.items) {
            const props = { ...item };
            const cm = new Item($list, props);
            cm.render();
        }

        // listBuilder.insertInto($list);
    };

    render();
};

export { ItemsList };