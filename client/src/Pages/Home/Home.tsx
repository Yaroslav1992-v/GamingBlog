import React from "react";
import { Header, Container, Footer, PostsMinList } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useSelector } from "react-redux";
import { getMinPost } from "../../store/post";

export const Home = () => {
  const { mode } = useApp();
  const posts = useSelector(getMinPost());
  console.log(posts);
  return (
    <Container size="big" mode={mode}>
      <Header />
      {posts.length > 0 && <PostsMinList posts={posts} />}
      <Footer mode={mode} />
    </Container>
  );
};
