import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpeakers, setKeyword } from "../../redux/speakers/actions";
import Alert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetchData";
import { setNotif } from "../../redux/notif/actions";
import SearchInput from "../../components/SearchInput";

function SpeakerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const speakers = useSelector((state) => state.speakers);
  const notif = useSelector((state) => state.notif);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchSpeakers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, speakers.keyword]);

  console.log(speakers);

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
        const res = await deleteData(`api/v1/speaker/${id}`);
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
            `berhasil hapus speaker ${res.data.data.name}`
          )
        );
        dispatch(fetchSpeakers());
      }
    });
  };

  return (
    <div>
      <Container>
        <Button
          size="sm"
          action={() => navigate("/speakers/create")}
          variant="success"
        >
          Tambah
        </Button>
        <BreadCrumb textSecond={"speakers"} />
        <SearchInput
          name="keyword"
          query={speakers.keyword}
          handleChange={(e) => dispatch(setKeyword(e.target.value))}
        />
        {notif.status && (
          <Alert type={notif.typeNotif} message={notif.message} />
        )}
        <Table
          status={speakers.status}
          thead={["Nama", "Avatar", "Role", "Aksi"]}
          data={speakers.data}
          tbody={["name", "avatar", "role"]}
          editUrl={"/speakers/edit"}
          deleteAction={(id) => handleDelete(id)}
          withoutPagination
        />
      </Container>
    </div>
  );
}

export default SpeakerPage;
