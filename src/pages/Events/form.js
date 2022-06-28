import React from "react";
import {
  CloseButton,
  Figure,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SelectBox from "../../components/SelectBox";

function Eventform({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  handleChangeKeyPoint,
  handlePlusKeyPoint,
  handleMinusKeyPoint,
}) {
  return (
    <Form className="mb-2">
      <TextInputWithLabel
        placeholder={"Masukan Judul"}
        label={"Judul"}
        name="title"
        value={form.title}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Harga"}
        label={"Harga"}
        name="price"
        value={form.price}
        type="number"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Stock"}
        label={"Stock"}
        name="stock"
        value={form.stock}
        type="number"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan tanggal acara"}
        label={"Tanggal"}
        name="date"
        value={form.date}
        type="datetime-local"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan About"}
        label={"About"}
        name="about"
        value={form.about}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Tempat Acara"}
        label={"Tempat Acara"}
        name="venueName"
        value={form.venueName}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Tagline"}
        label={"Tagline"}
        name="tagline"
        value={form.tagline}
        type="text"
        onChange={handleChange}
      />
      <Form.Label>Key Point</Form.Label>
      {form.keyPoint.map((key, index) => (
        <InputGroup className="mb-3" key={index}>
          <FormControl
            placeholder="Maukan Key Point"
            value={key}
            type="text"
            name="key"
            onChange={(e) => {
              handleChangeKeyPoint(e, index);
            }}
          />
          {index !== 0 && (
            <InputGroup.Text id="basic-addon2">
              <CloseButton onClick={() => handleMinusKeyPoint(index)} />
            </InputGroup.Text>
          )}
        </InputGroup>
      ))}

      <Button action={handlePlusKeyPoint} size="sm" className="mb-2 ">
        Tambah keyPoint
      </Button>

      <SelectBox
        label={"Category"}
        name="category"
        value={form.category}
        placeholder={"Masukan kategori"}
        options={lists.categories}
        handleChange={(e) => handleChange(e)}
        isClearable={true}
      />
      <SelectBox
        label={"Speaker"}
        name="speaker"
        value={form.speaker}
        placeholder={"Masukan pembicara"}
        options={lists.speakers}
        handleChange={(e) => handleChange(e)}
        isClearable={true}
      />

      <TextInputWithLabel
        placeholder={"Masukan cover"}
        label={"Cover"}
        name="cover"
        // value={form.avatar}
        type="file"
        onChange={handleChange}
      />
      {form.cover !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={form.cover}
            />
            <Figure.Caption>Preview image cover</Figure.Caption>
          </Figure>
        </div>
      )}

      <Button action={handleSubmit} loading={isLoading}>
        {edit ? "ubah" : "simpan"}
      </Button>
    </Form>
  );
}

export default Eventform;
