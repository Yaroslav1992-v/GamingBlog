import React, { useEffect, useState } from "react";
import { useApp } from "../../Hoc/AppLoader";
import { Box, Pagination } from "../../Components";
import { useAppDispatch } from "../../store/createStore";
import { getAllPosts, loadAllPosts } from "../../store/post";
import { useSelector } from "react-redux";
import { BlogList } from "./BlogList";
import { paginate } from "../../Utils/helpers";
import { PostBlogData } from "../../store/types";

export const Blog = () => {
  const { mode } = useApp();
  const dispatch = useAppDispatch();
  const posts = useSelector(getAllPosts());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;
  const postCrop = paginate<PostBlogData>(posts || [], currentPage, pageSize);
  useEffect(() => {
    dispatch(loadAllPosts());
  }, []);
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  return (
    <Box className="blog" mode={mode}>
      <div className="blog__container">
        {posts && (
          <>
            <BlogList posts={postCrop} />
            <Pagination
              pageSize={pageSize}
              itemsCount={posts.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </Box>
  );
};
