import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.6),
      width: 200
    }
  }
}));

export default function MultilineTextFields(props) {
  const classes = useStyles(); // bottle neck here was supposed to reduce complexity, but in turn had the opposite effect. These form components could use design rework
  let {
    id,
    label,
    helperText,
    className,
    options,
    onChange,
    disabled,
    name,
    value
  } = props;
  return (
    <div className={classes.root}>
      <TextField
        id={id}
        onChange={onChange}
        disabled={disabled}
        className={className}
        select
        label={label}
        name={name}
        value={value}
        helperText={helperText}
        required
        variant="outlined">
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
