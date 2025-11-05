import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<></>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
