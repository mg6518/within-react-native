import TodoRepository from "./TodoRepository";
import Immutable, { List } from "immutable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "./Todo";

/**
 * TodoRepository uses AsyncStorage and cannot run alone in a test. For more information,
 * see https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
 */

const exampleTodoList = List<Todo>([
  new Todo({ id: "0", name: "first task" }),
  new Todo({
    id: "1",
    name: "second task",
    notes: "I am important",
    disableNotifications: true,
  }),
  new Todo({ id: "2", name: "third task", notes: "I got some notes" }),
]);

test("Repository should be initialised empty if no arguments given", () => {
  const testRepo = new TodoRepository();
  expect(testRepo.todos.size).toBe(0);
  expect(AsyncStorage.setItem).toBeCalledWith(
    "todos",
    JSON.stringify([])
    // JSON.stringify(List<Todo>().map((e) => e.toEntity()).toJSON())
  );
});

test("Writing should only write entities", async () => {
  const testRepo = new TodoRepository(exampleTodoList);
  expect(AsyncStorage.setItem).toBeCalledWith(
    "todos",
    JSON.stringify(exampleTodoList.map((e) => e.toEntity()).toJSON())
  );
});

// Turn this into a snapshot test
test("Serialisation should restore original shape of data", async () => {
  const testRepo = new TodoRepository(exampleTodoList);
  const result = await testRepo.readTodos();
  expect(exampleTodoList.size).toEqual(result?.size);
});
