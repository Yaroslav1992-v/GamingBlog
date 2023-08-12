import React from "react";
import img from "../../Images/team.png";
export const AboutTop = () => {
  return (
    <div className="about__top">
      <div className="about__build">
        <div className="about__about">About out company</div>
        <h3 className="about__title">
          We’re Building The Destination For Getting Things Done{" "}
        </h3>
        <div className="about__top-text">
          <p>
            Crafting the Ultimate Gaming Haven: Your Go-To Hub for Achieving
            Gaming Greatness Welcome to our gaming blog, where we're dedicated
            to curating a virtual paradise for gamers of all kinds. We
            understand that gaming is more than just a hobby; it's a way of
            life, a passion, and a thrilling adventure. Our mission is clear: to
            provide you with the ultimate destination for accomplishing all your
            gaming dreams. From expert reviews and insider tips to breaking news
            and in-depth analyses, we're your compass in the vast world of
            gaming. Whether you're a seasoned pro or a curious newcomer, we're
            here to guide you on your journey towards gaming excellence. Join us
            as we unravel the latest gaming trends, uncover hidden gems, and
            connect with a vibrant community of fellow gamers. With our
            unwavering commitment to delivering quality content, we're not just
            building a blog – we're constructing a realm where your gaming
            aspirations are realized. Together, let's level up your gaming
            experience. Welcome to our world, where the quest for getting things
            done begins!"
          </p>
        </div>
      </div>
      <div className="about__top-image">
        <img src={img} alt="our team" />
      </div>
    </div>
  );
};
