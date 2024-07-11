import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { CreateTodo, Todo } from "../entities/Todo.entity";
import { todolistLocalStorageKey } from "../constants/key";

type TodoListContextType = {
  todoList: Todo[];
  addTodo: (todo: CreateTodo) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, updated: Partial<Exclude<Todo, "id">>) => void;
};

export const TodoListContext = createContext<TodoListContextType | undefined>({
  todoList: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
});

export const TodoListProvider = ({ children }: PropsWithChildren) => {
  const initContext = useRef(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // TodoList 초기화
  useEffect(() => {
    const todoListStr = localStorage.getItem(todolistLocalStorageKey);
    if (todoListStr) {
      setTodoList(JSON.parse(todoListStr));
    }
  }, []);

  // TodoList 변경 시 로컬스토리지에도 반영
  useEffect(() => {
    if (initContext.current) {
      console.log(todoList);
      localStorage.setItem(todolistLocalStorageKey, JSON.stringify(todoList));
    } else {
      initContext.current = true;
    }
  }, [todoList]);

  const addTodo = (createTodo: CreateTodo) => {
    const date = new Date();
    const todo: Todo = {
      text: createTodo.text,
      startDate: createTodo.schedule.startDate,
      deadline: createTodo.schedule.endDate,
      id: Date.now(),
      createdAt: date,
      updatedAt: null,
      finishedAt: null,
      isDone: false,
    };
    setTodoList((prev) => [...prev, todo]);
  };
  const removeTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };
  const updateTodo = (id: number, updated: Partial<Exclude<Todo, "id">>) => {
    console.log(id);
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
    );
  };

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        addTodo: addTodo,
        removeTodo: removeTodo,
        updateTodo: updateTodo,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
