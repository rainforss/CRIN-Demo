import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ITextInputProps extends ChakraProps {
  type: React.HTMLInputTypeAttribute;
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
  autoComplete?: string;
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({
  type,
  id,
  name,
  label,
  autoComplete,
  isRequired,
  ...chakraProps
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={isRequired}
      {...chakraProps}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        {...field}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete || "off"}
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInput;
