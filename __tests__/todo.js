let todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    add({ title: "Buy milk", dueDate: "2020-12-31", completed: false });
  });

  test("Create a new Todo", () => {
    expect(all.length).toEqual(1);
    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(2);
  });
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
});
