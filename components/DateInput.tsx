import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDateInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
}

const DateInput: React.FunctionComponent<IDateInputProps> = ({
  id,
  name,
  label,
  isRequired,
  ...chakraProps
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={isRequired}
      {...chakraProps}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <DatePicker
        id={id}
        name={name}
        selected={field.value}
        onChange={(date) => helpers.setValue(date)}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        className="date-input"
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default DateInput;
