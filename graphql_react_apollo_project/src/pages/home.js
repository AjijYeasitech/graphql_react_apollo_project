import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("user.token", user.token);
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center  overflow-hidden">
      {/* container */}
      <div className="container h-screen flex py-[19px]">
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
