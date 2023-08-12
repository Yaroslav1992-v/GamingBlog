import React from "react";
import { UserData } from "../../store/types";
import { cutString } from "../../Utils/helpers";
import { Link } from "react-router-dom";

export const AboutAdmin = ({ admin }: { admin: UserData }) => {
  return (
    <Link to={`/p/${admin._id}`} className="about__admin">
      <div className="about__admin-image">
        <img src={admin.image} alt="admin" />
      </div>
      <div className="about__admin-content">
        <h5 className="about__name">{admin.username}</h5>
        {admin.info && (
          <p className="about__info">{cutString(admin.info, 250)}</p>
        )}
      </div>
    </Link>
  );
};
