import React, { useEffect } from "react";
import { Box } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { AboutMission, AboutTeam, AboutTop, AboutValues } from ".";
import { useAppDispatch } from "../../store/createStore";
import { useSelector } from "react-redux";
import { getAdmins, loadAdmins } from "../../store/user";

export const About = () => {
  const { mode } = useApp();
  const dispatch = useAppDispatch();
  const team = useSelector(getAdmins());
  useEffect(() => {
    dispatch(loadAdmins());
  }, []);
  return (
    <Box mode={mode} className="about">
      <div className="about__container">
        <AboutTop />
        <AboutMission />
        <AboutValues mode={mode} />
        {team && <AboutTeam admins={team} />}
      </div>
    </Box>
  );
};
