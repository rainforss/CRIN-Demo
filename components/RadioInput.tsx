import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface IRadioInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  options: Array<{ value: string | number; label: string }>;
  isRequired?: boolean;
  isEditing?: boolean;
  alignment?: "row" | "column";
}

const RadioInput: React.FunctionComponent<IRadioInputProps> = ({
  id,
  name,
  label,
  options,
  isRequired,
  isEditing,
  alignment,
  ...chakraProps
}) => {
  const [field, meta, helper] = useField(name);
  return (
    <FormControl
      {...chakraProps}
      isRequired={isRequired}
      isInvalid={!!(meta.error && meta.touched)}
    >
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        value={field.value.toString()}
        id={id}
        onChange={helper.setValue}
      >
        <Stack
          spacing={alignment === "row" ? 4 : 2}
          direction={alignment || "column"}
        >
          {!isEditing && <Radio value="">All</Radio>}
          {options.map((o) => (
            <Radio value={o.value} key={o.value}>
              {o.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default RadioInput;
