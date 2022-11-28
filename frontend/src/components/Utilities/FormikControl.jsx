import { Input } from "../UI/Input";

export default function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    default:
      return null;
  }
}