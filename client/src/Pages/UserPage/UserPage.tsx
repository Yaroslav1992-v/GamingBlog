import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../Hoc/AppLoader";
import { ActionBtn, Box, Pagination, PostsMinList } from "../../Components";
import { useSelector } from "react-redux";
import { getCurrentUser, logOut } from "../../store/auth";
import { AiFillEdit, AiOutlineLogout } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/createStore";
import { getUser, loadUser } from "../../store/user";
import { getPostsByUserId, getUserPosts } from "../../store/post";
import { paginate } from "../../Utils/helpers";
import { PostMinData } from "../../store/types";
export const UserPage = () => {
  const { mode } = useApp();
  const currentUser = useSelector(getCurrentUser());
  const user = useSelector(getUser());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const posts = useSelector(getUserPosts());
  const pageSize = 2;
  const postCrop = paginate<PostMinData>(posts || [], currentPage, pageSize);
  const { id } = useParams();
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(loadUser(id));
      dispatch(getPostsByUserId(id));
    }
  }, [id]);
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  const pagRef = useRef<HTMLDivElement>(null);
  return (
    <main>
      <Box mode={mode} className="user-page">
        {" "}
        {user && (
          <div className="user-page__container">
            <div className="user-page__user">
              <div className="user-page__right">
                <h1 className="user-page__title">{user.username}</h1>
                {user?.info && (
                  <div className="user-page__desc">
                    <p>{user?.info}</p>
                  </div>
                )}
                <div className="user-page__actions">
                  {currentUser?._id === user._id && (
                    <ActionBtn
                      Icon={<FcSettings />}
                      type="link"
                      to={`/account/${user?._id}/edit`}
                      text="Edit User"
                    />
                  )}
                  {currentUser?._id === user._id &&
                    currentUser.role === "admin" && (
                      <ActionBtn
                        Icon={<AiFillEdit />}
                        type="link"
                        to={`/post`}
                        text="Write Post"
                      />
                    )}
                  {currentUser?._id === user._id && (
                    <ActionBtn
                      Icon={<AiOutlineLogout />}
                      type="button"
                      onClick={handleLogOut}
                      text="Log Out"
                    />
                  )}
                </div>
              </div>
              <div className="user-page__left">
                <div className="user-page__image">
                  {user?.image && <img src={user.image} alt="userImage" />}
                </div>
              </div>
            </div>
            {posts && (
              <div ref={pagRef} className="user-page__posts">
                <h2 className="user-page__posts-title">
                  Posted By {user.username} {` (${posts.length})`}
                </h2>
                <PostsMinList posts={postCrop} />
                <Pagination
                  divRef={pagRef}
                  pageSize={pageSize}
                  itemsCount={posts.length}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        )}
      </Box>
    </main>
  );
};
