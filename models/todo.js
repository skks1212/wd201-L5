// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo-list\n\n");

      console.log("Overdue");
      const overdues = await Todo.overdue();
      const formattedOverdues = overdues
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(formattedOverdues);
      console.log("\n\n");

      console.log("Due Today");
      const itemsDueToday = await Todo.dueToday();
      const formattedItemsDueToday = itemsDueToday
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(formattedItemsDueToday);
      console.log("\n\n");

      console.log("Due Later");
      const itemsDueLater = await Todo.dueLater();
      const formattedItemsDueLater = itemsDueLater
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(formattedItemsDueLater);
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      await Todo.update(
        { completed: true },
        {
          where: {
            id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
