import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage/>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
