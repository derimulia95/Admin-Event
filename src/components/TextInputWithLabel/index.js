import React from "react";
import { Form } from "react-bootstrap";
import TextInput from "../TextInput";

function TextInputWithLabel({
  label,
  name,
  value,
  type,
  placeholder,
  onChange,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <TextInput
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </Form.Group>
  );
}

export default TextInputWithLabel;
