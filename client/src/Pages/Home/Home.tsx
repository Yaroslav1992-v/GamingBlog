import React, { useEffect } from "react";
import {
  Header,
  Container,
  Footer,
  PostsMinList,
  ActionBtn,
} from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useSelector } from "react-redux";
import { getMinPost } from "../../store/post";
import { useAppDispatch } from "../../store/createStore";
import { tags } from "../../Utils/mockData";
import { createTags } from "../../store/tags";
import { FaIcons } from "react-icons/fa";

export const Home = () => {
  const { mode } = useApp();
  const posts = useSelector(getMinPost());

  // const tagss = tags;
  // const newArray: string[] = [];

  // for (let i = 0; i < tagss.length; i++) {
  //   if (!newArray.includes(tagss[i].toLowerCase())) {
  //     newArray.push(tags[i].toLowerCase());
  //   }
  // }
  // console.log(newArray);
  // const loadDada = () => {
  //   dispatch(createTags(newArray));
  // };
  // const dispatch = useAppDispatch();
  return (
    <Container size="big" mode={mode}>
      {/* <ActionBtn
        type="button"
        onClick={loadDada}
        Icon={<FaIcons />}
        text="tags"
      /> */}
      <Header />
      {posts.length > 0 && <PostsMinList posts={posts} />}
      <Footer mode={mode} />
    </Container>
  );
};
