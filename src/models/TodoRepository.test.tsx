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
  new Todo({ id: "3", name: "fourth task" }),
]);

test("Repository should read from AsyncStore on initialisation", () => {
  const testRepo = new TodoRepository();
  expect(testRepo.todos.length).toBe(0);
  expect(AsyncStorage.getItem).toBeCalledWith("todos");
});

test("addItem() should write to storage and add appropriately", () => {
  const testRepo = new TodoRepository();
  expect(testRepo.todos.length).toEqual(0);

  testRepo.addItem(exampleTodoList.toArray()[0]);
  expect(testRepo.todos.length).toEqual(1);
  expect(AsyncStorage.setItem).toBeCalledWith(
    "todos",
    JSON.stringify([exampleTodoList.toArray()[0].toEntity()])
  );

  testRepo.addItem(exampleTodoList.toArray()[1]);
  expect(testRepo.todos.length).toEqual(2);

  expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
  expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
    "todos",
    JSON.stringify(
      exampleTodoList
        .toArray()
        .slice(0, 2)
        .map((item) => item.toEntity())
    )
  );
});

// Turn this into a snapshot test
test("Serialisation should restore original shape of data", async () => {
  const testRepo = new TodoRepository();
  // const result = await testRepo.readTodos();
  // expect(0).toEqual(result?.size);
});
