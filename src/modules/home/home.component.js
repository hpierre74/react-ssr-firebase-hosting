import React from "react";
import Button from "@material-ui/core/Button";

const ToPageA = ({ navigate }) => {
  return (
    <div>
      <Button onClick={() => navigate("/a")} variant="outlined" color="primary">
        ToPageA
      </Button>
    </div>
  );
};

const ToPageB = ({ navigate }) => {
  return (
    <div>
      <Button
        onClick={() => navigate("/b")}
        variant="outlined"
        color="secondary"
      >
        ToPageB
      </Button>
    </div>
  );
};
const Home = props => {
  return (
    <div>
      <ToPageA navigate={props.navigate} />
      <ToPageB navigate={props.navigate} />
    </div>
  );
};

export default Home;
