import React from "react";
import { useNavigate } from "react-router-dom";
import { dataLuckySpinParty, scrollToTopSmooth } from "../datas/data";
import UpComing from "../components/UpComing";
import BtnToSpin from "../components/BtnToSpin";
import SearchSection from "../components/searchSection";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <UpComing />
      <SearchSection />
      <BtnToSpin />
    </div>
  );
};

export default Home;
