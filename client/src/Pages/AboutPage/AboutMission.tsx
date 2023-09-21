import React from "react";
import img from "../../Images/team2.png";
export const AboutMission = () => {
  return (
    <div className="about__mission">
      <div className="about__mission-box">
        <div className="about__about">About out company</div>
        <h3 className="about__title">Our Mission</h3>
        <div className="about__mission-content">
          <p>
            At Our Gaming Blog, we are on a dedicated mission to transform the
            way gaming is perceived and experienced. With an unwavering passion
            for gaming and a commitment to quality content, our platform stands
            as a beacon for both casual players and dedicated enthusiasts.
          </p>
          <p>
            Our primary goal is to create a thriving gaming community that
            fosters inclusivity, creativity, and positive engagement. Through
            insightful articles, reviews, and discussions, we strive to elevate
            gaming beyond mere entertainment, showcasing its impact on culture,
            technology, and society.
          </p>
          <p>
            Guided by the principle that every game tells a story and every
            player is a storyteller, we aim to provide a diverse range of
            perspectives that celebrate the artistry, innovation, and diversity
            within the gaming world. By delving into the latest trends,
            exploring gaming history, and analyzing the future of interactive
            entertainment, we offer readers a comprehensive and enriching
            experience.
          </p>
        </div>{" "}
      </div>
      <div className="about__mission-image">
        <img src={img} alt="our team" />
      </div>
    </div>
  );
};
