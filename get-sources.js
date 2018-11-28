function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function getSources(url) {
    const ul = document.getElementById('sources');
    let response = fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let sources = data.sources;
            return sources.map(source => {
                let li = createNode('li'),
                    span = createNode('span');
                span.innerHTML = `${source.name}`;
                append(li, span);
                append(ul, li);
            });
        })
        .catch(error => {
            console.log(error);
            //JSON.stringify(error)
        });
}