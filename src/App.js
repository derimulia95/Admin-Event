import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentNavbar from "./components/Navbar";
import Categpries from "./pages/Categories";
import CategoryCreate from "./pages/Categories/create";
import CategoryEdit from "./pages/Categories/edit";
import Event from "./pages/Events";
import EventCreate from "./pages/Events/create";
import EventEdit from "./pages/Events/edit";
import PageSignin from "./pages/Signin";
import Speakers from "./pages/Speakers";
import SpeakersCreate from "./pages/Speakers/create";
import SpeakersEdit from "./pages/Speakers/edit";
import TransactionsPage from "./pages/Transactions";
import { listen } from "./redux/listener";

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <BrowserRouter>
      <ComponentNavbar />
      <Routes>
        <Route path="/login" exac element={<PageSignin />} />
        <Route path="/categories" element={<Categpries />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:categoryId" element={<CategoryEdit />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/speakers/create" element={<SpeakersCreate />} />
        <Route path="/speakers/edit/:speakersId" element={<SpeakersEdit />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/create" element={<EventCreate />} />
        <Route path="/events/edit/:eventId" element={<EventEdit />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
