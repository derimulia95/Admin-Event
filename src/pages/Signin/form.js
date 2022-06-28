import React from "react";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import Button from "../../components/Button";

function FormSignIn({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        label={"Email"}
        placeholder={"Masukan Email"}
        name="email"
        value={form.email}
        type="email"
        onChange={handleChange}
      />
      <TextInputWithLabel
        label={"Password"}
        placeholder={"Masukan Password"}
        name="password"
        value={form.password}
        type="password"
        onChange={handleChange}
      />
      <Button action={handleSubmit} loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
}

export default FormSignIn;
