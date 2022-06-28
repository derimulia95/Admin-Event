import React from "react";
import { Alert } from "react-bootstrap";

function ComponentAlert({ message, type }) {
  return <Alert variant={type}>{message}</Alert>;
}
export default ComponentAlert;
