import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import HomePage from "./components/Homepage/Homepage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import AddNewCategory from "./components/Categories/AddNewCategory";


function App() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/add-category" component={AddNewCategory} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;