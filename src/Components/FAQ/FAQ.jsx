import React from "react";
//{ useState }
import FAQItem from "./FAQ_Item";
import Navbar from "../Navigation";
import Footer from "../Footer";
// import { NavLink } from "react-router-dom";
import ChatUs from "../ChatUS";
// import FooterDesktop from "../FooterDesktop";

const FAQ = () => {
   
    return (
        <>
            <ChatUs />
            <Navbar />
            <FAQItem />
            <Footer />
        </>
    );
};

export default FAQ;
