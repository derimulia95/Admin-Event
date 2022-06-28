import React from "react";
import { Form } from "react-bootstrap";

function TextInput({ name, value, type, placeholder, onChange }) {
  return (
    <Form.Control
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
  );
}

export default TextInput;
