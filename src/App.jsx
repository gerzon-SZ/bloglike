import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../utils/usecontext'

import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from './features/users/UserPage';
import Layout from "./components/Layout";

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import SignInSide from '../pages/SignInSide'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signinside" element={<SignInSide />} />
          <Route index element={<PostsList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

          <Route path="user">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>

          {/* Catch all - replace with 404 component if you want */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>

      </Routes>
    </AuthProvider>
  )
}

export default App


