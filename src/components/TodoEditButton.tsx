import { Button, DatePicker, Flex, Input, Modal, notification } from "antd";
import { useModal } from "../hooks/shared/useModal";
import { EditTodo, Todo } from "../entities/Todo.entity";
import { Controller, useForm } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useTodoListContext } from "../hooks/contexts/useTodoListProvider";
import { FormEvent } from "react";

type Props = {
  todo: Todo;
};

export default function TodoEditButton({ todo }: Props) {
  const { updateTodo } = useTodoListContext();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    getFieldState,
  } = useForm<EditTodo>({
    defaultValues: {
      text: "",
      schedule: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
    mode: "onChange",
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: "error" | "success") => {
    api[type]({
      message: type === "error" ? "실패" : "알림",
      description:
        type === "error"
          ? "업데이트에 실패했습니다."
          : "할 일이 추가되었습니다.",
    });
  };

  const updateTodoHandler = (data: EditTodo) => {
    updateTodo(todo.id, {
      text: data.text,
      startDate: data.schedule.startDate,
      deadline: data.schedule.endDate,
    });
    openNotification("success");
    handleClose();
  };

  const {
    isModalOpen,
    handleOk,
    handleCancel: handleClose,
    showModal,
  } = useModal({
    modalHandler: (e: FormEvent) => {
      const todoInvalid = getFieldState("text").invalid;
      const scheduleInvalid = getFieldState("schedule").invalid;
      if (errors.text || errors.schedule || todoInvalid || scheduleInvalid) {
        openNotification("error");
        clearErrors("text");
        clearErrors("schedule");
      } else {
        handleSubmit(updateTodoHandler)(e);
        clearErrors("text");
        clearErrors("schedule");
      }
    },
    autoClose: false,
  });

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="수정하시겠습니까?"
        open={isModalOpen}
        onCancel={handleClose}
        onOk={handleOk}
        okText="Edit"
        cancelText="Cancel"
      >
        <Flex vertical gap="small">
          <div>수정할 내용을 입력해주세요</div>
          <form onSubmit={handleSubmit(updateTodoHandler)}>
            <Flex vertical gap="small">
              <Controller
                name="text"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length >= 3 || "3글자 이상 입력해주세요",
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      placeholder={todo.text}
                      prefix={<UserOutlined />}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="schedule"
                rules={{
                  validate: {
                    startDate: (value) =>
                      !!value.startDate || "날짜를 선택해주세요",
                    endDate: (value) =>
                      !!value.endDate || "날짜를 선택해주세요",
                    dateOrder: (value) =>
                      new Date(value.startDate) < new Date(value.endDate) ||
                      "날짜를 선택해주세요",
                  },
                }}
                render={({ field: { value, ...fieldProps } }) => {
                  return (
                    <DatePicker.RangePicker
                      onChange={(dates) => {
                        if (dates) {
                          const [start, end] = dates;
                          fieldProps.onChange({
                            startDate: start?.toDate(),
                            endDate: end?.toDate(),
                          });
                        }
                      }}
                      defaultValue={[
                        dayjs(value.startDate),
                        dayjs(value.endDate),
                      ]}
                    />
                  );
                }}
              />
            </Flex>
          </form>
        </Flex>
      </Modal>
      {contextHolder}
    </>
  );
}
