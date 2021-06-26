import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Search from "./components/Feed/Search";
import SearchViewing from "./components/Feed/Search/ViewingStore";
export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/feed" exact component={Feed} />
      <Route path="/feed/search/:searchString" exact component={Search} />
      <Route path="/feed/restaurant/:id" exact component={SearchViewing} />
    </Router>
  );
}
