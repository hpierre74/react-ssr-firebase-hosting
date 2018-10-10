import React from "react";
import Header from "./components/header";

const App = ({ facts }) => {
  return (
    <div>
      <Header facts={facts} />
    </div>
  );
};

export default App;
