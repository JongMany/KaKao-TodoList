import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";

type Props = {
  isOn: boolean;
  toggleHandler: () => void;
};

export default function ToggleButton({ isOn, toggleHandler }: Props) {
  // const [isOn, setIsOn] = useState(on);
  return (
    <Space direction="vertical">
      <Switch
        onClick={toggleHandler}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={isOn}
      />
    </Space>
  );
}
