import Root from "./components/ui/root/Root";
import Home from "./components/views/home/Home";
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import ThingsList from "./components/views/things-list/ThingsList";
import ThingDetail from "./components/views/thing-detail/ThingDetail";
import MyThings from "./components/views/my-things/MyThings";
import AddThing from "./components/views/add-thing/AddThing";
import EditThing from "./components/views/edit-thing/EditThing";
import DeleteThing from "./components/views/delete-thing/DeleteThing";
import UsersList from "./components/views/users-list/UsersList";
import UserDetail from "./components/views/user-detail/UserDetail";
import ProtectedRoute from "./components/ui/protected-route/ProtectedRoute";
import BagsList from "./components/views/bag-list/BagsList";
import BagDetail from "./components/views/bag-detail/BagDetail";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "treasures/",
        element: <ThingsList />,
      },
      {
        path: "treasures/:id/",
        element: <ThingDetail />,
      },
      {
        path: "my-things/",
        element: <ProtectedRoute element={<MyThings />} />,
      },
      {
        path: "my-things/add/",
        element: <ProtectedRoute element={<AddThing />} />,
      },
      {
        path: "my-bag/",
        element: <ProtectedRoute element={<MyThings />} />,
      },
      {
        path: "bags/add/",
        element: <ProtectedRoute element={<AddThing />} />,
      },

      {
        path: "my-things/:id/edit/",
        element: <ProtectedRoute element={<EditThing />} />,
      },
      {
        path: "my-things/:id/delete/",
        element: <ProtectedRoute element={<DeleteThing />} />,
      },
      {
        path: "users/",
        element: <ProtectedRoute element={<UsersList />} />,
      },
      {
        path: "users/:id/",
        element: <ProtectedRoute element={<UserDetail />} />,
      },
      {
        path: "bags/",
        element: <ProtectedRoute element={<BagsList />} />,
      },
      {
        path: "bags/:id/",
        element: <ProtectedRoute element={<BagDetail />} />,
      },
    ],
  },
];

export default routes;
