import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import Form from "./form";
import { postData } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
  });

  const [isLoading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    //action submit
    setLoading(true);
    try {
      const res = await postData("api/v1/category", form);
      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil menambahkan data kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    }
  };
  return (
    <Container>
      <BreadCrumb
        textSecond={"Categories"}
        urlSecond={"/categories"}
        textThird={"create"}
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default CategoryCreate;
