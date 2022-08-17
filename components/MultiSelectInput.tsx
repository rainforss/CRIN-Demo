import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  ChakraProps,
  IconButton,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import { MultiSelect } from "react-multi-select-component";

interface IMultiSelectInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
  options: Array<{ label: string; value: string }>;
}

const MultiSelectInput: React.FunctionComponent<IMultiSelectInputProps> = ({
  id,
  name,
  label,
  isRequired,
  options,
  ...chakraProps
}) => {
  const [field, meta, helper] = useField(name);

  console.log(field.value);
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={isRequired}
      {...chakraProps}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <MultiSelect
        options={options}
        value={field.value}
        onChange={helper.setValue}
        labelledBy="Select"
        valueRenderer={(selected, _options) => {
          return selected.length
            ? selected.map(({ label }) => label + "; ")
            : "None selected";
        }}
        ArrowRenderer={() => (
          <IconButton
            ml={2}
            size="sm"
            aria-label="Open Dropdown"
            icon={<ChevronDownIcon fontSize="1.5rem" />}
          />
        )}
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default MultiSelectInput;
