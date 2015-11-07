import React from 'react';
import { ButtonInput, Button } from 'react-bootstrap';

export default class MyButtonInput extends ButtonInput {
  renderInput() {
    let {children, value, ...other} = this.props;
    let val = children ? children : value;
    return <Button {...other} componentClass="button" ref="input" key="input">{val}</Button>;
  }
}
