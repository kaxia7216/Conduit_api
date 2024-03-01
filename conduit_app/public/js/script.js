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
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';
      for (let todo of data.todos) {
        let listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
          ${todo.title}
          <button onclick="editTodo(${todo.id})">編集</button>
          <button onclick="deleteTodo(${todo.id})">削除</button>
        `;
        todoList.appendChild(listItem);
      }
    });
}

// fetchArticles();