import React, { useEffect } from "react";
import { Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    document.title = 'Page Not Found'
  }, [])
  return (
    <section className="flex justify-center align-center min-h-screen">
      <div className="container flex flex-col justify-center items-center">
        <Frown className="mb-4 h-20 w-20 md:h-30 md:w-30" />
        <h1 className="heading-2 text-2xl md:text-4xl mb-4 text-center">404 - Page Not Found</h1>
        <p className="body-text text-gray-700 mb-7 text-center">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable
        </p>
        <button className="button-1" onClick={() => navigate("/")}>
          Go to homepage
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
