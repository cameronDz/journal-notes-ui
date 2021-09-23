import React, { Fragment } from "react";
import PropType from "prop-types";
import { Grid } from "@material-ui/core";
import InputContainer from "../inputs/inputContainer";

const propTypes = {
  inputs: PropType.array,
  name: PropType.string,
};
const JournalForm = ({ inputs, name }) => {
  const handleUpdate = (updateValue, updateName) => {
    console.info("update value: ", updateValue, ", name: ", updateName);
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
                    name={input.name}
                    onUpdate={(update) => handleUpdate(update, name)}
                    title={input.title}
                    type={input.type}
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
