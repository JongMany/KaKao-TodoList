import { Flex } from "antd";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { TodoListProvider } from "./components/TodoListProvider";

function App() {
  return (
    <>
      <header></header>
      <main>
        <TodoListProvider>
          <Flex align="start" justify="center" gap="middle">
            <TodoList />
            <TodoInput />
          </Flex>
        </TodoListProvider>
      </main>
    </>
  );
}

export default App;
