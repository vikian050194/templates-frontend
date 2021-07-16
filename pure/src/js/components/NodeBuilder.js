class State {
    constructor(index, elements = []) {
        this.index = index;
        this.elements = elements;
    }

    addElement(element) {
        const index = element;
        const elements = [...this.elements, element];
        // is State class Data Container or not?
        return new State(index, elements);
    }
}

class NodeBuilder {
    constructor(state) {
        if (state) {
            this.state = state;
        } else {
            this.state = new State();
        }
    }

    _createElement(tag, attributes) {
        const element = document.createElement(tag);

        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }

        return element;
    }

    _addElement(tag, attributes) {
        const element = this._createElement(tag, attributes);
        const newState = this.state.addElement(element);

        return new NodeBuilder(newState);
    }

    div(attributes) {
        return this._addElement("div", attributes);
    }

    withText(text) {
        const content = document.createTextNode(text);
        this.state.index.appendChild(content);

        return this;
    }

    _addHandler(action, handler) {
        this.state.index.addEventListener(action, handler);
    }

    onClick(handler) {
        this._addHandler("click", handler);

        return this;
    }

    done($root) {
        if ($root.hasChildNodes()) {
            let children = $root.childNodes;

            for (let i = 0; i < children.length; i++) {
                $root.replaceChild(this.state.elements[i], children[i]);
            }
        } else {
            for (let element of this.state.elements) {
                $root.appendChild(element);
            }
        }
    }
}

export { NodeBuilder };