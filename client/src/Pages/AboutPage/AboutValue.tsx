import React from "react";
import { AboutValueProps } from "./about.props";

export const AboutValue = ({ value }: { value: AboutValueProps }) => {
  return (
    <div className="about__value">
      <div className="about__value-image">
        <img src={value.image} alt="value" />
      </div>
      <div className="about__value-content">
        <h4 className="about__value-title">{value.title}</h4>
        <div className="about__value-text">
          <p>{value.text}</p>
        </div>
      </div>
    </div>
  );
};
