import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import Form from "./form";
import { getData, putData } from "../../utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import moment from "moment";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/actions";
import { config } from "../../config";

function EventEdit() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    title: "",
    price: "",
    date: "",
    file: "",
    cover: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    category: "",
    speaker: "",
    stock: "",
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListSpeakers());
    dispatch(fetchListCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchOneEvent = async () => {
    const res = await getData(`api/v1/event/${eventId}`);

    setForm({
      ...form,
      title: res.data.data.title,
      price: res.data.data.price,
      date: moment(res.data.data.date).format("YYYY-MM-DDTHH:SS"),
      file: `${config.api_image}/${res.data.data.cover}`,
      cover: `${config.api_image}/${res.data.data.cover}`,
      about: res.data.data.about,
      venueName: res.data.data.venueName,
      tagline: res.data.data.tagline,
      keyPoint: res.data.data.keyPoint,
      category: {
        label: res?.data?.data?.category?.name,
        target: { name: "category", value: res?.data?.data?.category?._id },
        value: res?.data?.data?.category?._id,
      },
      speaker: {
        label: res?.data?.data?.speaker?.name,
        target: { name: "speaker", value: res?.data?.data?.speaker?._id },
        value: res?.data?.data?.speaker?._id,
      },
      stock: res.data.data.stock,
    });
  };

  console.log(form);

  useEffect(() => {
    fetchOneEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "cover") {
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
    } else if (e.target.name === "category" || e.target.name === "speaker") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    //action submit
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("cover", form.file);
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("date", form.date);
      formData.append("about", form.about);
      formData.append("venueName", form.venueName);
      formData.append("tagline", form.tagline);
      formData.append("keyPoint", JSON.stringify(form.keyPoint));
      formData.append("category", form.category.value);
      formData.append("speaker", form.speaker.value);
      formData.append("stock", form.stock);
      formData.append("status", true);

      const res = await putData(`api/v1/event/${eventId}`, formData, true);
      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil update data Events ${res.data.data.title}`
        )
      );
      navigate("/events");
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];
    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push("");

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (item, i) {
        return i;
      })
      .indexOf(index);
    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  return (
    <Container>
      <BreadCrumb
        textSecond={"events"}
        urlSecond={"/events"}
        textThird={"Edit"}
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        lists={lists}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
      />
    </Container>
  );
}

export default EventEdit;
