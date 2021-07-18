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

export default class NodeBuilder {
    constructor($root) {
        this.$root = $root;
        this.prevState = null;
        this.state = new State();
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
        this.state = this.state.addElement(element);

        return this;
    }

    addElement(element) {
        this.state = this.state.addElement(element);

        return this;
    }

    insert(child) {
        this.state.index.appendChild(child);
    }

    div(attributes) {
        return this._addElement("div", attributes);
    }

    span(attributes) {
        return this._addElement("span", attributes);
    }

    h1(attributes) {
        return this._addElement("h1", attributes);
    }

    withText(text) {
        const content = document.createTextNode(text);
        this.insert(content);

        return this;
    }

    _addHandler(action, handler) {
        this.state.index.addEventListener(action, handler);
    }

    onClick(handler) {
        this._addHandler("click", handler);

        return this;
    }

    done() {
        if (this.prevState) {
            for (let i = 0; i < this.prevState.elements.length; i++) {
                this.$root.replaceChild(this.state.elements[i], this.prevState.elements[i]);
            }
        } else {
            for (let element of this.state.elements) {
                this.$root.appendChild(element);
            }
        }

        this.prevState = this.state;
        const result = this.state;
        this.state = new State();
        return result.index;
    }
}