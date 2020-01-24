/* eslint-disable no-lone-blocks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.6),
      width: 200
    }
  }
}));

export default function BasicTextField(props) {
  const classes = useStyles();
  let { label, attr } = props;
  return (
    <div className={classes.root}>
      <TextField id="outlined" label={label} {...attr} variant="outlined" />
    </div>
  );
}

/* <TextField id="standard-basic" label="Standard" />      <====== This is for reference. These are different styles that the material-ui api offers.
<TextField id="filled-basic" label="Filled" variant="filled" /> */
