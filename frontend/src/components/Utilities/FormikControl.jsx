import { Input } from "../UI/Input";
import { RadioButtons } from "../UI/RadioButtons";
import { DatePicker } from "../UI/DatePicker";
import { Textarea } from "../UI/Textarea";
import { RangeInput } from "../UI/RangeInput";

export default function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "range":
      return <RangeInput {...rest} />;
    default:
      return null;
  }
}
