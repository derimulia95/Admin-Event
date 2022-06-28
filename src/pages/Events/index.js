import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  setKeyword,
  setCategory,
  setSpeaker,
} from "../../redux/events/actions";
import Alert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetchData";
import { setNotif } from "../../redux/notif/actions";
import SearchInput from "../../components/SearchInput";
import SelectBox from "../../components/SelectBox";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/actions";

function EventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const events = useSelector((state) => state.events);
  const notif = useSelector((state) => state.notif);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, events.keyword, events.category, events.speaker]);

  useEffect(() => {
    dispatch(fetchListSpeakers());
    dispatch(fetchListCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Anda tidak dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`api/v1/event/${id}`);
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: `Berhasil hapus data ${res.data.data.name}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });

        // cara ke 2
        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus Event ${res.data.data.title}`
          )
        );
        dispatch(fetchEvents());
      }
    });
  };

  return (
    <div>
      <Container>
        <Button
          size="sm"
          action={() => navigate("/events/create")}
          variant="success"
        >
          Tambah
        </Button>
        <BreadCrumb textSecond={"Events"} />
        <Row>
          <Col>
            <SearchInput
              name="keyword"
              query={events.keyword}
              handleChange={(e) => dispatch(setKeyword(e.target.value))}
            />
          </Col>
          <Col>
            <SelectBox
              name="category"
              value={events.category}
              placeholder={"Masukan pencarian kategori"}
              options={lists.categories}
              handleChange={(e) => dispatch(setCategory(e))}
              isClearable={true}
            />
          </Col>
          <Col>
            <SelectBox
              placeholder={"Masukan pencarian pembicara"}
              name="speaker"
              value={events.speaker}
              options={lists.speakers}
              handleChange={(e) => dispatch(setSpeaker(e))}
              isClearable={true}
            />
          </Col>
        </Row>

        {notif.status && (
          <Alert type={notif.typeNotif} message={notif.message} />
        )}
        <Table
          status={events.status}
          thead={[
            "Tittle",
            "Harga",
            "Tanggal",
            "Tempat",
            "kategori",
            "Pembicara",
            "Aksi",
          ]}
          data={events.data}
          tbody={[
            "title",
            "price",
            "date",
            "venueName",
            "categoryName",
            "speakersName",
          ]}
          editUrl={"/events/edit"}
          deleteAction={(id) => handleDelete(id)}
          withoutPagination
        />
      </Container>
    </div>
  );
}

export default EventPage;
