import React, { useEffect, useState, Fragment } from "react";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import { generateFormValues } from "../../libs/generateFormValues";
import { handleFunction } from "../../libs/eventUtil";
import { transformValuesToCurrentVersion } from "../../libs/transformer";
import InputContainer from "../../components/inputs/inputContainer";

const propTypes = {
  editValues: PropType.object,
  formValues: PropType.object,
  inputs: PropType.array,
  isDisabled: PropType.bool,
  name: PropType.string,
  onDirtiedForm: PropType.func,
  reloadInputs: PropType.bool,
  reloadValues: PropType.bool,
  setReloadInputs: PropType.func,
  setReloadValues: PropType.func,
  updateValues: PropType.func,
};
const JournalForm = ({
  editValues = null,
  formValues = null,
  inputs = null,
  isDisabled = true,
  name = "",
  onDirtiedForm = null,
  reloadInputs = false,
  reloadValues = false,
  setReloadInputs = null,
  setReloadValues = null,
  updateValues = null,
}) => {
  const [hasSetValues, setHasSetValues] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    handleFunction(updateValues, values);
  }, [updateValues, values]);

  useEffect(() => {
    if (reloadValues && !!editValues) {
      const transValues = transformValuesToCurrentVersion(editValues);
      setValues(transValues);
      handleFunction(setReloadValues, false);
    }
  }, [editValues, reloadValues, setReloadValues]);

  useEffect(() => {
    if (reloadInputs && !!inputs) {
      const { journalType, _version, ...remaining } = formValues || {};
      const generatedValues = generateFormValues(inputs, remaining);
      handleFunction(setReloadInputs, false);
      setValues(generatedValues);
    }
  }, [formValues, inputs, reloadInputs, setReloadInputs]);

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
        return { ...(prev ? prev : {}), [updateName]: updateValue };
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
                    options={input.options}
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
