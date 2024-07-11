import { List, Radio, RadioChangeEvent } from "antd";
import { useTodoListContext } from "../hooks/contexts/useTodoListProvider";
import { Content } from "antd/es/layout/layout";

import EmptyView from "./EmptyView";
import TodoItem from "./TodoItem";
import { useState } from "react";

export default function TodoList() {
  const [doneStatus, setDoneStatus] = useState("all");
  const { todoList } = useTodoListContext();
  const onChangeDoneStatue = (e: RadioChangeEvent) => {
    setDoneStatus(e.target.value);
  };

  const filterTodoList = () => {
    if (doneStatus === "all") {
      return todoList;
    } else if (doneStatus === "todo") {
      return todoList.filter((todo) => !todo.isDone);
    } else {
      return todoList.filter((todo) => todo.isDone);
    }
  };

  const filteredTodoList = filterTodoList();

  return (
    <Content
      style={{
        display: "flex",
        width: "70%",
        minWidth: "70%",
      }}
    >
      {todoList.length > 0 ? (
        <List
          style={{
            width: "100%",
          }}
          header={
            <>
              <h2>Todo List</h2>
              <div>
                <Radio.Group value={doneStatus} onChange={onChangeDoneStatue}>
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="todo">Todo</Radio.Button>
                  <Radio.Button value="done">Done</Radio.Button>
                </Radio.Group>
              </div>
            </>
          }
          size="large"
          bordered
          dataSource={filteredTodoList}
          renderItem={(todo) => (
            <List.Item>
              <List.Item.Meta
                title={todo.text}
                description={<TodoItem todo={todo} />}
              />
            </List.Item>
          )}
        />
      ) : (
        // todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        <EmptyView />
      )}
    </Content>
  );
}
