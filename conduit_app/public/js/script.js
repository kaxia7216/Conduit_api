const api = 'http://localhost/api'; // API の URL に置き換える

function addArticle() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tagList').value;
    const tagList = tags.split(' ');

    const createData = { article: { title, description, body, tagList } };
    fetch(`${api}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createData)
    })
    .then(response => response.json())
    .then(() => {
      fetchArticles();
    });
}

function fetchArticles() {
    fetch(`${api}/articles`)
    .then(response => response.json())
    .then(data => {
      const articleList = document.getElementById('article-list');
      articleList.innerHTML = '';
      for (let article of data.articles) {
        let listItem = document.createElement('div');
        listItem.className = 'article-preview';
        listItem.innerHTML = `
            <div class="article-meta">
                <div class="info">
                    <span class="date">${article.created_at}</span>
                </div>
            </div>
            <a href="/article/${article.id}" class="preview-link">
                <h1>${article.title}</h1>
                <p>${article.description}</p>
                <span>Read more...</span>
                <ul class="tag-list" id="article-tag-${article.id}">
                    <li class="tag-default tag-pill tag-outline">realworld</li>
                    <li class="tag-default tag-pill tag-outline">implementations</li>
                </ul>
            </a>
        `;
        articleList.appendChild(listItem);
      }
    });
}

function fetchSpecifiedArticle(id) {
    fetch(`${api}/article/${id}`)
    .then(response => response.json())
    .then(data => {
        const articleTitle = document.getElementById('header-title');
        const article = data.article;
        articleTitle.innerHTML = `
            <h1>${article.title}</h1>
            <form id="article-edit" action="/edit/${article.id}" method="GET"></form>
            <form id="article-delete" action="/delete/${article.id}" method="DELETE"></form>
            <div class="article-meta">
                <div class="info">
                    <span class="date">${article.created_at}</span>
                </div>
                <button class="btn btn-sm btn-outline-secondary" form="article-edit">
                    <i class="ion-edit"></i> Edit Article
                </button>
                <button class="btn btn-sm btn-outline-danger" form="article-delete" onclick="deleteArticle(${article.id})">
                    <i class="ion-trash-a"></i> Delete Article
                </button>
            </div>
        `;

        const articleBody = document.getElementById('main-page');
        articleBody.innerHTML = `
            <p>${article.body}</p>
            <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">realworld</li>
                <li class="tag-default tag-pill tag-outline">implementations</li>
            </ul>
        `;
      });
}

function fetchSpecifiedArticleForEdit(id){
    fetch(`${api}/article/${id}`)
    .then(response => response.json())
    .then(data => {
        const article = data.article;
        document.getElementById('title').value = article.title;
        document.getElementById('description').value = article.description;
        document.getElementById('body').value = article.body;
        //タグ情報も後から表示するようにしたい
    });
}

function editArticle(){
    //
}

function deleteArticle(){
    //
}

fetchArticles();