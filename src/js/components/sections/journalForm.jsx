import React, { useEffect, useState, Fragment } from "react";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import InputContainer from "../inputs/inputContainer";
import { generateFormValues } from "../../libs/generateFormValues";

const propTypes = {
  defaultValues: PropType.object,
  inputs: PropType.array,
  isDisabled: PropType.bool,
  name: PropType.string,
};
const JournalForm = ({
  defaultValues = null,
  inputs = null,
  isDisabled = true,
  name = "",
}) => {
  const [hasSetValues, setHasSetValues] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    if (!hasSetValues && !!defaultValues && !!inputs) {
      const generatedValues = generateFormValues(inputs, defaultValues);
      setValues(generatedValues);
      setHasSetValues(true);
    }
  }, [defaultValues, hasSetValues, inputs]);

  const handleUpdate = (updateValue, updateName) => {
    if (values?.[updateName] !== undefined) {
      setValues((prev) => {
        return { ...prev, [updateName]: updateValue };
      });
    }
  };

  return (
    <Grid container spacing={0}>
      {Array.isArray(inputs) &&
        inputs.map((input, index) => {
          return (
            !!input && (
              <Fragment key={input.id || index}>
                <Grid item xs={12} sm={12} md={12}>
                  <InputContainer
                    isDisabled={isDisabled}
                    name={input.name}
                    onUpdate={(update) => handleUpdate(update, name)}
                    title={input.title}
                    type={input.type}
                    value={values?.[input.name]}
                  />
                </Grid>
              </Fragment>
            )
          );
        })}
    </Grid>
  );
};

JournalForm.propTypes = propTypes;
export default JournalForm;
