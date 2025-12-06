import React from "react";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Contact from "../components/Contact";
import UserRoleBanner from "../components/UserRoleBanner";

function Home() {
    const role = localStorage.getItem("userRole");
  const fullName = localStorage.getItem("fullName");
  return (
    <div>
      <UserRoleBanner role={role} fullName={fullName} />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Contact />
    </div>
  );
}

export default Home;
