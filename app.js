import Test from "./src/test/test";

let test = new Test();
    
let playground = localStorage.getItem("playground");
playground = playground ? JSON.parse(playground) : {};

playground.test ? test.init() : null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.command) {
        case 'setItem':
            localStorage.setItem(request.name, JSON.stringify(request.data));
            return;
        case 'getItem':
            sendResponse(localStorage.getItem(request.name));
            return;
        case 'run':
            request.name === 'test' ? test.init() : null;
            return;
    }
});