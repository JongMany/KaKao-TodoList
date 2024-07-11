import { format } from "date-fns";
import { Todo } from "../entities/Todo.entity";
import ToggleButton from "./shared/ToggleButton";
import { useTodoListContext } from "../hooks/contexts/useTodoListProvider";
import { Button, Flex, Modal } from "antd";
import { useModal } from "../hooks/shared/useModal";

import TodoEditButton from "./TodoEditButton";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { updateTodo, removeTodo } = useTodoListContext();
  const doneHandler = () => {
    updateTodo(todo.id, { isDone: !todo.isDone });
  };

  const { isModalOpen, handleOk, handleCancel, showModal } = useModal({
    modalHandler: () => {
      removeTodo(todo.id);
    },
  });

  return (
    <Flex gap="small" align="center">
      <Flex vertical>
        <div>시작일: {format(todo.startDate, "yyyy년 MM월 dd일")}</div>
        <div>종료일: {format(todo.deadline, "yyyy년 MM월 dd일")}</div>
      </Flex>
      <ToggleButton isOn={todo.isDone} toggleHandler={doneHandler} />
      <TodoEditButton todo={todo} />
      <>
        <Button danger onClick={showModal}>
          Remove
        </Button>
        <Modal
          title="정말 삭제하시겠습니까?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </>
    </Flex>
  );
}
