window.onload = () => {
    const scripts = document.querySelectorAll('.script-switch');
    let playground = {},

        sendData = (data) => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { command: 'setItem', name: 'playground', data: data });
            });
        },

        runScript = (name) => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { command: 'run', name: name });
            });
        };

    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: 'getItem', name: 'playground' }, (response) => {
            playground = response ? JSON.parse(response) : {};

            for (const [key, value] of Object.entries(playground)) {
                const script = document.getElementById(key);
                script ? script.querySelector('input').checked = value : null;
            }
        });
    });

    scripts.forEach(script => {
        const input = script.querySelector('input'),
              label = script.querySelector('label');

        input.addEventListener('change', () => {
            playground[script.id] = input.checked;
            sendData(playground);
        });

        label.addEventListener('click', () => {
            runScript(script.id);
        })
    });
};
    