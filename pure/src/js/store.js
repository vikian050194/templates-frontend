const createStore = (reducer, initialState) => {
    const state = initialState;
    const listeners = [];

    const getState = () => state;

    const addListener = (callback) => {
        const removeListener = () => {
            const index = listeners.indexOf(callback);
            listeners.splice(index, 1);
        };
        listeners.push(callback);
        return { removeListener };
    };

    const dispatch = (action) => {
        const state = reducer(state, action);
        listeners.forEach((callback) => {
            callback(state);
        });
    };

    const thunk = (func, value) => {
        func(dispatch, getState)(value);
    };

    return {
        getState,
        thunk,
        dispatch,
        addListener
    };
};

export default createStore;