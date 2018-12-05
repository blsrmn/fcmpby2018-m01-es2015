const apiKey = '95f968dd4a6d4f10afc88510599bcd64';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

let getSources = (url) => {
    const ul = document.getElementById('sources');
    let response = fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let sources = data.sources;
            return sources.map(source => {
                let li = createNode('li'),
                    a = createNode('a');
                a.innerHTML = `${source.name}`;
                a.href = "#"
                a.onclick = () => { return getNews(`${source.id}`); }
                append(li, a);
                append(ul, li);
            });
        })
        .catch(error => {
            console.log(error);
            //JSON.stringify(error)
        });
}

function getNews(sourceId) {
    const url = `https://newsapi.org/v1/articles?source=${sourceId}&apiKey=${apiKey}`;
    const ul = document.getElementById('articles');
    ul.innerHTML = '';

    let response = fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let articles = data.articles;
            let elements = articles.map(article => {
                let li = createNode('li'),
                    spanTitle = createNode('span'),
                    spanText = createNode('span'),
                    img = createNode('img'),
                    href = createNode('a');
                img.src = article.urlToImage;
                href.href = article.url;
                spanTitle.innerHTML = `${article.title}`;
                spanTitle.className = 'news-title';
                spanText.innerHTML = `${article.description}`;
                
                append(href, img);
                append(li, href);
                append(li, spanTitle);
                append(li, spanText);
                append(ul, li);
            });

            console.log(articles);
        });
}