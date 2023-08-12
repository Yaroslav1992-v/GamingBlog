import React from "react";
import { Box } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";

export const Contact = () => {
  const { mode } = useApp();
  return (
    <Box mode={mode} className="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contact Us</h1>
        <div className="contact__contact">
          Email to contact : <span>yarikvkkp1992@gmail.com</span>
        </div>
      </div>
    </Box>
  );
};
