const { connect } = require("./connectDB");
const Todo = require("./todoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Second Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(todo.displayableString());
  } catch (e) {
    console.error(e);
  }
};

const countItems = async () => {
  try {
    const count = await Todo.count();
    console.log(count);
  } catch (e) {
    console.error(e);
  }
};

const getAllTodos = async () => {
  try {
    const todos = await Todo.findAll({
      order: [["id", "ASC"]],
    });
    console.log(todos.map((todo) => todo.displayableString()).join("\n"));
  } catch (e) {
    console.error(e);
  }
};

const getSingleTodo = async () => {
  try {
    const todo = await Todo.findOne({
      where: {
        completed: false,
      },
      order: [["id", "ASC"]],
    });
    console.log(todo.displayableString());
  } catch (e) {
    console.error(e);
  }
};

const updateTodo = async (id) => {
  try {
    const todo = await Todo.update(
      { completed: true },
      {
        where: {
          id,
        },
      }
    );
    console.log(todo.displayableString());
  } catch (e) {
    console.error(e);
  }
};

const deleteTodo = async (id) => {
  try {
    const todo = await Todo.destroy({
      where: {
        id,
      },
    });
    console.log(todo + " row(s) deleted");
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  await getAllTodos();
  //await updateTodo(2);
  await getAllTodos();
  await deleteTodo(2);
  // await createTodo();
})();
