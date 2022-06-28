import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import Alert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetchData";
import { setNotif } from "../../redux/notif/actions";

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories);
  const notif = useSelector((state) => state.notif);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        const res = await deleteData(`api/v1/category/${id}`);
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
            `berhasil hapus kategori ${res.data.data.name}`
          )
        );
        dispatch(fetchCategories());
      }
    });
  };

  return (
    <div>
      <Container>
        <Button
          size="sm"
          action={() => navigate("/categories/create")}
          variant="success"
        >
          Tambah
        </Button>
        <BreadCrumb textSecond={"Categories"} />
        {notif.status && (
          <Alert type={notif.typeNotif} message={notif.message} />
        )}
        <Table
          status={categories.status}
          thead={["Nama", "Aksi"]}
          data={categories.data}
          tbody={["name"]}
          editUrl={"/categories/edit"}
          deleteAction={(id) => handleDelete(id)}
          withoutPagination
        />
      </Container>
    </div>
  );
}

export default Categories;
