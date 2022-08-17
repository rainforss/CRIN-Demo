import {
  ChakraProps,
  Checkbox,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ICheckboxInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
}

const CheckboxInput: React.FunctionComponent<ICheckboxInputProps> = ({
  id,
  name,
  label,
  isRequired,
  ...chakraProps
}) => {
  const [field, meta, helper] = useField(name);
  return (
    <FormControl
      {...chakraProps}
      isRequired={isRequired}
      isInvalid={!!(meta.error && meta.touched)}
    >
      <Checkbox
        id={id}
        isChecked={!field.value}
        spacing={4}
        onChange={() => {
          helper.setValue(!field.value);
        }}
      >
        {label}
      </Checkbox>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CheckboxInput;
