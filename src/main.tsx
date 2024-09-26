import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import Footer from "./Components/Footer.tsx";
import Header from "./Components/Header.tsx";
import MobileNavigation from "./Components/MobileNavigation.tsx";
import "./index.css";
import Detail from "./Pages/Detail.tsx";
import Explore from "./Pages/Explore.tsx";
import Home from "./Pages/Home.tsx";
import SearchPage from "./Pages/SearchPage.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <div className="pt-16 pb-14 lg:pb-0">
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<App />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Detail" element={<Explore />}></Route>
          <Route path="/Detail/:id" element={<Detail />}></Route>
          <Route path="/Search" element={<SearchPage />}></Route>
        </Routes>
        <Footer />
        <MobileNavigation />
      </BrowserRouter>
    </div>

  </React.StrictMode>
);
