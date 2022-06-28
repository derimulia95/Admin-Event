import React from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

function Categoryform({ handleSubmit, form, handleChange, isLoading, edit }) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan nama kategori"}
        label={"Nama kategori"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <Button action={handleSubmit} loading={isLoading}>
        {edit ? "ubah" : "simpan"}
      </Button>
    </Form>
  );
}

export default Categoryform;
