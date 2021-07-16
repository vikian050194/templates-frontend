import App from "./components/App";

window.addEventListener("load", function() {
    App("#root");
});

console.info(`App is started at ${(new Date()).toLocaleString()}`);