const db = require("../models");
/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Create a new Todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
  /*
  test("Should mark a Todo as complete", () => {
    expect(all.length).toEqual(2);
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });
  test("Should return overdue items", () => {
    expect(all.length).toEqual(2);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "An overdue test item",
      completed: false,
      dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toEqual(3);
    overdueItems = overdue();
    expect(overdueItems.length).toBe(2);
  });
  test("Should return due today items", () => {
    expect(all.length).toEqual(3);
    const today = new Date();
    add({
      title: "A due today test item",
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    expect(all.length).toEqual(4);
    dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(2);
  });
  test("Should return due later items", () => {
    expect(all.length).toEqual(4);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "A due later test item",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toEqual(5);
    dueLaterItems = dueLater();
    expect(dueLaterItems.length).toEqual(1);
  });
  */
});
