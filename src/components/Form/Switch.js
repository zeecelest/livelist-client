import { Switch } from '@material-ui/core';

import React, { Component } from 'react';

export default class SwitchComp extends Component {
  render() {
    let { onChange, id, checked, value, name } = this.props;
    return (
      <Switch
        onChange={onChange}
        id={id}
        checked={checked}
        name={name}
        value={value}
        color="rgb(183, 51, 97)"
        size="medium"
      />
    );
  }
}
