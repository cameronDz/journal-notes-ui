import React, { useEffect, useState, Fragment } from "react";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import { generateFormValues } from "../../libs/generateFormValues";
import { handleFunction } from "../../libs/eventUtil";
import InputContainer from "../../components/inputs/inputContainer";

const propTypes = {
  formValues: PropType.object,
  inputs: PropType.array,
  isDisabled: PropType.bool,
  name: PropType.string,
  onDirtiedForm: PropType.func,
  updateValues: PropType.func,
};
const JournalForm = ({
  formValues = null,
  inputs = null,
  isDisabled = true,
  name = "",
  onDirtiedForm = null,
  updateValues = null,
}) => {
  const [hasSetValues, setHasSetValues] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    handleFunction(updateValues, values);
  }, [updateValues, values]);

  useEffect(() => {
    if (!hasSetValues || formValues === null) {
      const newValues = formValues || {};
      const generatedValues = generateFormValues(inputs, newValues);
      setHasSetValues(formValues === null);
      setValues(generatedValues);
    }
  }, [formValues, hasSetValues, inputs]);

  const handleUpdate = (updateValue, updateName) => {
    if (values?.[updateName] !== undefined) {
      setValues((prev) => {
        return { ...(!!prev ? prev : {}), [updateName]: updateValue };
      });
      handleFunction(onDirtiedForm, true);
    }
  };

  return (
    <Grid container spacing={0}>
      {!!name && <h3>{name}</h3>}
      {Array.isArray(inputs) &&
        inputs.map((input, index) => {
          return (
            !!input &&
            !input.isHidden && (
              <Fragment key={input.id || index}>
                <Grid item xs={12} sm={12} md={12}>
                  <InputContainer
                    elementName={input.elementName}
                    isDisabled={isDisabled}
                    name={input.name}
                    onUpdate={(update) => handleUpdate(update, input.name)}
                    title={input.title}
                    type={input.inputType}
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
