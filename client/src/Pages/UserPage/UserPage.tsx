import React from "react";
import { useApp } from "../../Hoc/AppLoader";
import { ActionBtn, Box } from "../../Components";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";
import { AiFillEdit } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
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
            <div className="user-page__actions">
              <ActionBtn
                Icon={<FcSettings />}
                type="link"
                to={`/account/${user?._id}/edit`}
                text="Edit User"
              />
              <ActionBtn
                Icon={<AiFillEdit />}
                type="link"
                to={`/post`}
                text="Write Post"
              />
            </div>
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
