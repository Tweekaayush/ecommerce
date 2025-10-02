import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateOrder } from "../slices/order.slice";

const SuccessPage = () => {
  //   const { search } = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateOrder({ sessionId }));
  }, [sessionId]);
  return <div>SuccessPage</div>;
};

export default SuccessPage;
