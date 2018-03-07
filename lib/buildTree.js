const buildTodos = (t) => {
  return t.map('SELECT id, title, user_id, created_at, updated_at FROM todos', [], (todo) => {
    return t.any(
      'SELECT id, content, complete, todo_id, created_at, updated_at FROM todo_items WHERE todo_id = $1',
      [todo.id],
    )
      .then((todoItems) => {
        todo.todoItems = todoItems;
        return todo;
      });
  })
    .then(t.batch);
};

const buildTodo = (todoId) => {
  const buildTodoTree = (t) => {
    return t.map('SELECT id, title, user_id, created_at, updated_at FROM todos  WHERE id = $1', [todoId], (todo) => {
      return t.any(
        'SELECT id, content, complete, created_at, updated_at, todoId FROM todo_items WHERE todoId = $1',
        [todo.id],
      )
        .then((todoItems) => {
          todo.todoItems = todoItems;
          return todo;
        });
    })
      .then(t.batch);
  };

  return buildTodoTree;
};

const buildUsers = (t) => {
  return t.map('SELECT id, name, email, created_at, updated_at FROM users', [], (user) => {
    return t.any(
      'SELECT id, title, created_at, updated_at, user_id FROM todos WHERE todos.user_id = $1',
      [user.id],
    )
      .then((todos) => {
        user.todos = todos;
        return user;
      });
  })
    .then(t.batch);
};

module.exports = {
  buildTodos,
  buildTodo,
  buildUsers,
};
