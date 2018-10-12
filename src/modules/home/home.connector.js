import { connect } from "react-redux";

import Home from "./home.component";
import { pushTo } from "../../utils/routing.utils";

export default connect(null, {
  navigate: destination => pushTo(destination)
})(Home);
