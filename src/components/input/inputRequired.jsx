import React from 'react';
import PropTypes from 'prop-types';

const inputRequired = ({ control }) => {
  return (
    <Controller
      name="title"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          id="outlined-basic"
          label="Post Title"
          variant="outlined"
          {...field}
        />
      )}
    />
  );
};

PostTitleInput.propTypes = {
  control: PropTypes.object.isRequired, // Replace 'object' with the correct PropTypes for 'control'
};

export default PostTitleInput;
