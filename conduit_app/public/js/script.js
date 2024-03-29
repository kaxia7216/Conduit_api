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

      //記事の表示
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
                </ul>
            </a>
        `;
        articleList.appendChild(listItem);
      }

      //ページ右側のタグ一覧の表示
      const tagRankList = document.getElementById('tag-Rank');
      tagRankList.innerHTML = '';

      for(let tag of data.tagRank) {
        let tagList = document.createElement('a');
        tagList.className = 'tag-pill tag-default';

        tagList.innerHTML = `${tag.name}`;

        tagRankList.appendChild(tagList);
      }

    });
}

function fetchSpecifiedArticle(id) {
    fetch(`${api}/article/${id}`)
    .then(response => response.json())
    .then(data => {
        //記事タイトル
        const articleTitle = document.getElementById('header-title');
        const article = data.article;
        articleTitle.innerHTML = `
            <h1>${article.title}</h1>
            <form id="article-edit" action="/edit/${article.id}" method="GET"></form>
            <form id="article-delete" action="/delete/${article.id}" method="GET"></form>
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

        //記事本文
        const articleBody = document.getElementById('main-page');
        articleBody.innerHTML = `
            <p>${article.body}</p>
            <ul class="tag-list" id="tag-list">
                <li class="tag-default tag-pill tag-outline">realworld</li>
                <li class="tag-default tag-pill tag-outline">implementations</li>
            </ul>
        `;

        const articleTag = document.getElementById('tag-list');
        articleTag.innerHTML = '';

        for(let tag of data.tags){
            let tagList = document.createElement('li');
            tagList.className = 'tag-default tag-pill tag-outline';

            tagList.innerHTML =`${tag.name}`;
            articleTag.appendChild(tagList);
        }
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

        const addedTag = document.getElementById('added-Tags');
        addedTag.innerHTML = '';

        for(let tag of data.tags){
            let tagList = document.createElement('a');
            // tagList.className = 'tag-default tag-pill';
            tagList.setAttribute('href', `/tag-delete/${tag.pivot.article_id}&${tag.pivot.tag_id}`);
            tagList.setAttribute('onclick', `deleteArticleTags(${tag.pivot.article_id}, ${tag.pivot.tag_id})`);

            tagList.innerHTML =`<span class="tag-default tag-pill"> <i class="ion-close-round"></i> ${tag.name} </span>`;
            addedTag.appendChild(tagList);
        }
    });
}

function editArticle(id){
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tagList').value;
    const tagList = tags.split(' ');

    const editData = { article: { title, description, body, tagList } };
    fetch(`${api}/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
    .then(response => response.json())
    .then(() => {
        fetchArticles();
      });
}

function deleteArticle(id){
    $status = confirm('記事を削除しますか？')

    if($status === true){
        fetch(`${api}/delete/${id}`, {
            method: 'DELETE'
          })
          .then(() => {
            fetchArticles();
          });
    }
}

function addComment(id){
    const comment = document.getElementById('post-comment').value;

    fetch(`${api}/createComment/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "comment" : { comment } })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('post-comment').value = '';
    });
}

function fetchArticleComments(id){
    fetch(`${api}/comments/${id}`)
    .then(response => response.json())
    .then(data => {
        const commentList = document.getElementById('comments');
        commentList.innerHTML = '';

        for (let comment of data.comments) {
            let commentItem = document.createElement('div');
            commentItem.className = 'card';
            commentItem.innerHTML = `
                <div class="card-block">
                    <p class="card-text">
                    ${comment.body}
                    </p>
                </div>
                <div class="card-footer">
                    <span class="date-posted">${comment.created_at}</span>
                    <span class="mod-options">
                        <a href="/deleteComment/${id}"><i class="ion-trash-a" onclick="deleteComment(${comment.id})"></i></a>
                    </span>
                </div>
            `;
            commentList.appendChild(commentItem);
        }
    });
}

function deleteComment(id){
    fetch(`${api}/deleteComment/${id}`, {
        method: 'DELETE'
      })
    .then(() => {
        fetchArticleComments();
      });
}

function deleteArticleTags(article_id, tag_id){
    fetch(`${api}/tag-delete/${article_id}&${tag_id}`, {
        method: 'DELETE'
      })
      .then(() => {
        fetchSpecifiedArticleForEdit(article_id);
      });
}

fetchArticles();