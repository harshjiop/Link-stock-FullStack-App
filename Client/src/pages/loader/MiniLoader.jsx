import React from "react";
import "./Loader.css";
function MiniLoader() {
  // return <div className="miniLoader"></div>;
  return (
    <div className="flex justify-center items-center">
      {/* <header class="loader--title">Ripple</header> */}
      <div className="loader--ripple flex justify-center items-center">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default MiniLoader;
