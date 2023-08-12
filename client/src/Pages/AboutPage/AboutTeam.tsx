import React from "react";
import { UserData } from "../../store/types";
import { AboutAdmin } from "./AboutAdmin";

export const AboutTeam = ({ admins }: { admins: UserData[] }) => {
  return (
    <div className="about__team">
      <div className="about__about">About out company</div>
      <h3 className="about__title">Our Team</h3>
      <ul className="about__list">
        {admins.map((a) => (
          <li key={a._id} className="about__item">
            <AboutAdmin admin={a} />
          </li>
        ))}
      </ul>
    </div>
  );
};
