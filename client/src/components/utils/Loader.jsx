import { Oval } from "react-loader-spinner";

import React from "react";

const Loader = () => {
  return (
    <Oval
      visible={true}
      height="40"
      width="40"
      color="#7c3aed"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
