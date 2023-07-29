import React from "react";
import { Box } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";
import { EditForm } from "./EditForm";

export const EditUser = () => {
  const { mode } = useApp();
  const user = useSelector(getCurrentUser());
  return (
    <Box mode={mode} className="edit-user">
      <div className="edit-user__container">
        {user && <EditForm user={user} />}
      </div>
    </Box>
  );
};
