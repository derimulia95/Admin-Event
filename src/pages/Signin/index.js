import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Alert from "../../components/Alert";
import { postData } from "../../utils/fetchData";
import Form from "./form";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";

function PageSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    if (token) return navigate(-1);
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("api/v1/auth/signin", form);
      // console.log(res);
      dispatch(userLogin(res.data.data.token, "role", "username"));
      setIsLoading(false);

      navigate("/categories");
    } catch (err) {
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
      setIsLoading(false);
    }
  };

  return (
    <Container md={12} className="vh-100">
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Sigin</Card.Title>
          <Form
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            alert={alert}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
