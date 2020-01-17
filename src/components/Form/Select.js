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
  const classes = useStyles();
  let {
    id,
    label,
    helperText,
    className,
    options,
    onChange,
    disabled,
    name
  } = props;
  return (
    <div className={classes.root} noValidate autoComplete="off">
      <TextField
        id={id}
        onChange={onChange}
        disabled={disabled}
        className={className}
        select
        label={label}
        name={name}
        helperText={helperText}
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
