import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./layouts/Header";
import Users from "./pages/Users";
import Register from './pages/Register';
import Login from './pages/Login';
import useToken from './hooks/useToken';
import useLogedUser from './hooks/useLogedUser';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';
import SinglePost from './pages/SinglePost';
import Footer from './layouts/Footer';
import ChangePassword from './pages/ChangePassword';
import EditUser from './pages/EditUser';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import CreateTag from './pages/CreateTag';
import UnpublishedPost from './pages/UnpublishedPosts';
import UnapprovedComments from './pages/UnapprovedComments';


function App() {

  const { token, setToken } = useToken();
  const { user, setUser } = useLogedUser();


  if (!token) {
    return (
      <Router>
        <div className="App">
          <Header token={token} user={user} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Login setToken={setToken} setUser={setUser} />} />
              <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
              <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div className="App">
          <Header token={token} user={user} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/change-password" element={<ChangePassword user={user} />} />
              <Route path="/users/edit" element={<EditUser user={user} setUser={setUser} />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<SinglePost user={user} />} />
              <Route path="/edit-post" element={<EditPost user={user} />} />
              <Route path="/create-post" element={<CreatePost user={user} />} />
              {user.is_admin &&
                <>
                  <Route path="/create-tag" element={<CreateTag />} />
                  <Route path="/unpublished-posts" element={<UnpublishedPost />} />
                  <Route path="/unapproved-comments" element={<UnapprovedComments />} />
                </>
              }
              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }


}

export default App;
