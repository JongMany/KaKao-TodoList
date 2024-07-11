import { useForm, Controller } from "react-hook-form";
import { CreateTodo } from "../entities/Todo.entity";
import { useTodoListContext } from "../hooks/contexts/useTodoListProvider";
import { Alert, Button, DatePicker, Flex, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function TodoInput() {
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreateTodo>({
    defaultValues: {
      text: "",
      schedule: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
    mode: "onSubmit",
  });

  const { addTodo } = useTodoListContext();

  console.log(errors);

  const onClear = () => {
    clearErrors("text");
    clearErrors("schedule");
  };

  const onSubmit = (data: CreateTodo) => {
    addTodo({
      ...data,
      schedule: {
        startDate: new Date(data.schedule.startDate),
        endDate: new Date(data.schedule.endDate),
      },
    });
    reset();
  };

  return (
    <div
      style={{
        width: "30%",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Flex vertical gap="large">
          <div>
            <Controller
              name="text"
              control={control}
              rules={{
                validate: (value) =>
                  value.length >= 3 || "3글자 이상 입력해주세요",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="할 일을 입력해주세요"
                  prefix={<UserOutlined />}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="schedule"
              rules={{
                validate: {
                  startDate: (value) =>
                    !!value.startDate || "날짜를 선택해주세요",
                  endDate: (value) => !!value.endDate || "날짜를 선택해주세요",
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

            {/* <Datepicker {...register("deadline", { required: true })} /> */}
            {/* <input type="date" {...register("deadline", { required: true })} /> */}
            {/* <span>{errors.deadline && "날짜를 선택해주세요"}</span> */}
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              제출
            </Button>
          </div>
          <div className="min-h-[20px]">
            {errors.text && (
              <Alert
                message={`${errors.text.message}`}
                type="warning"
                closable
                onClose={onClear}
              />
            )}
            {!errors.text && errors.schedule && (
              <Alert
                message={`${errors.schedule.message}`}
                type="warning"
                closable
                onClose={onClear}
              />
            )}
          </div>
        </Flex>
      </form>
    </div>
  );
}
