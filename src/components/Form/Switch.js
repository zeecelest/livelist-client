import { Switch } from '@material-ui/core';

import React, { Component } from 'react';

export default class SwitchComp extends Component {
  render() {
    let { onChange, id, checked, value } = this.props;
    return (
      <Switch
        onChange={onChange}
        id={id}
        checked={checked}
        value={value}
        color="primary"
        size="medium"
      />
    );
  }
}
