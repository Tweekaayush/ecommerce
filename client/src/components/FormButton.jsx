import React from "react";
import { LoaderCircle } from "lucide-react";

const FormButton = ({ loading, value }) => {
  return (
    <button className="button-2" disabled={loading}>
      {loading ? <LoaderCircle className="mx-auto animate-spin" /> : value}
    </button>
  );
};

export default FormButton;
