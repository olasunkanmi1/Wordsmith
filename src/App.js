import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import HomePage from "./components/Homepage/Homepage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";

function App() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <AdminRoute exact path="/add-category" component={AddNewCategory} />
          <AdminRoute exact path="/category-list" component={CategoryList} />
          <AdminRoute exact path="/update-category/:id" component={UpdateCategory} />
          <PrivateProtectRoute exact path="/create-post" component={CreatePost} />
          <PrivateProtectRoute  exact path="/update-post/:id" component={UpdatePost} />
          <Route exact path="/posts" component={PostsList} />
          <Route exact path="/posts/:id" component={PostDetails} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;