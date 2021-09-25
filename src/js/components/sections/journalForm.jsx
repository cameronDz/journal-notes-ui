import React, { useEffect, useState, Fragment } from "react";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import { generateFormValues } from "../../libs/generateFormValues";
import { handleFunction } from "../../libs/eventUtil";
import InputContainer from "../inputs/inputContainer";

const propTypes = {
  defaultValues: PropType.object,
  inputs: PropType.array,
  isDisabled: PropType.bool,
  name: PropType.string,
  updateValues: PropType.func,
};
const JournalForm = ({
  defaultValues = null,
  inputs = null,
  isDisabled = true,
  name = "",
  updateValues = null,
}) => {
  const [hasSetValues, setHasSetValues] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    handleFunction(updateValues, values);
  }, [updateValues, values]);

  useEffect(() => {
    if (!hasSetValues || defaultValues === null) {
      const newValues = defaultValues || {};
      const generatedValues = generateFormValues(inputs, newValues);
      setHasSetValues(defaultValues === null);
      setValues(generatedValues);
    }
  }, [defaultValues, hasSetValues, inputs]);

  const handleUpdate = (updateValue, updateName) => {
    if (values?.[updateName] !== undefined) {
      setValues((prev) => {
        return { ...(!!prev ? prev : {}), [updateName]: updateValue };
      });
    }
  };

  return (
    <Grid container spacing={0}>
      {!!name && <h3>{name}</h3>}
      {Array.isArray(inputs) &&
        inputs.map((input, index) => {
          return (
            !!input && (
              <Fragment key={input.id || index}>
                <Grid item xs={12} sm={12} md={12}>
                  <InputContainer
                    elementName={input.elementName}
                    isDisabled={isDisabled}
                    name={input.name}
                    onUpdate={(update) => handleUpdate(update, input.name)}
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
