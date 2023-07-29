import React from "react";
import { useApp } from "../../Hoc/AppLoader";
import { ActionBtn, Box } from "../../Components";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";
import { AiFillEdit } from "react-icons/ai";
export const UserPage = () => {
  const { mode } = useApp();
  const user = useSelector(getCurrentUser());
  return (
    <main>
      <Box mode={mode} className="user-page">
        {" "}
        <div className="user-page__container">
          <div className="user-page__right">
            <h1 className="user-page__title">{user?.username}</h1>
            {user?.info && (
              <div className="user-page__desc">
                <p>{user?.info}</p>
              </div>
            )}
            <ActionBtn
              Icon={<AiFillEdit />}
              type="link"
              to={`/account/${user?._id}/edit`}
              text="Edit User"
            />
          </div>
          <div className="user-page__left">
            <div className="user-page__image">
              {user?.image && <img src={user.image} alt="userImage" />}
            </div>
          </div>
        </div>
      </Box>
    </main>
  );
};
