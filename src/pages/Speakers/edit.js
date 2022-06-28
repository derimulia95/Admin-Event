import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import Form from "./form";
import { getData, putData } from "../../utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import { config } from "../../config";

function SpeakerEdit() {
  const { speakersId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    role: "",
    file: "",
    avatar: "",
  });

  const [isLoading, setLoading] = useState(false);
  const fetchOneSpeaker = async () => {
    const res = await getData(`api/v1/speaker/${speakersId}`);

    setForm({
      ...form,
      name: res.data.data.name,
      role: res.data.data.role,
      avatar: `${config.api_image}/${res.data.data.avatar}`,
    });
  };

  useEffect(() => {
    fetchOneSpeaker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          setForm({
            ...form,
            file: e.target.files[0],
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    //action submit
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("avatar", form.file);
      formData.append("name", form.name);
      formData.append("role", form.role);
      const res = await putData(`api/v1/speaker/${speakersId}`, formData, true);
      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil update data Speaker ${res.data.data.name}`
        )
      );
      navigate("/speakers");
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
        textSecond={"speakers"}
        urlSecond={"/speakers"}
        textThird={"Edit"}
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

export default SpeakerEdit;
