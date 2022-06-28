import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetchData";
import Categoryform from "./form";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function CategoryEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOneCategories = async () => {
    const res = await getData(`api/v1/category/${categoryId}`);

    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await putData(`api/v1/category/${categoryId}`, form);
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil ubah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
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
        textThird={"edit"}
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Categoryform
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default CategoryEdit;
