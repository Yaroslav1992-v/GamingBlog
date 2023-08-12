import React from "react";
import { AboutValueProps } from "./about.props";
import rocket from "../../Images/rocket.png";
import whiterocket from "../../Images/whiteRocket.png";
import lighter from "../../Images/lighter.png";
import whitelighter from "../../Images/whiteLighter.png";
import brain from "../../Images/brain.png";
import whitebrain from "../../Images/whiteBrain.png";
import { AboutValue } from "./AboutValue";
export const AboutValues = ({ mode }: { mode: "dark" | "light" }) => {
  const values: AboutValueProps[] = [
    {
      image: mode === "light" ? rocket : whiterocket,
      text: " where we embody speed and strength in delivering the latest updates, reviews, and insights. Join us on an exhilarating journey through the gaming universe!",
      title: "Fast & Strong",
    },
    {
      image: mode === "light" ? lighter : whitelighter,
      text: " where innovation and imagination collide. We're dedicated to exploring the dynamic world of gaming, sharing insights, reviews, and captivating stories. Join us on this thrilling journey through pixels and narratives.",
      title: "creative",
    },
    {
      image: mode === "light" ? brain : whitebrain,
      text: " Immerse yourself in a world of thrilling adventures, cutting-edge reviews, and gaming insights. Join us as we explore the ever-evolving realm of gaming and share our passion with fellow enthusiasts",
      title: "storm brain",
    },
  ];
  return (
    <div className="about__values">
      <div className="about__about">About out company</div>
      <h3 className="about__title">Our Values</h3>
      <ul className="about__values-list">
        {values.map((v, i) => (
          <li className="about__values-item" key={`value${i}`}>
            <AboutValue value={v} />
          </li>
        ))}
      </ul>
    </div>
  );
};
