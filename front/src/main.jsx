import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Provider from './components/login/Provider.jsx';
import CardList from './components/apps/CardList.jsx';
import CardB from './components/apps/CardB.jsx';
import Header from './components/UI/Header.jsx';
import EditCard from './components/apps/EditCard.jsx';
import ContCard from './components/apps/ContCard.jsx';
import UserList from './components/users/UserList.jsx';
import UserEdit from './components/users/UserEdit.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider />,
  },
  {
    path: "/:email/list",
    element:
      <>
        <Header />
        <CardList />
      </>,
  },
  {
    path: "/:email/list/editcard/:id",
    element:
      <>
        <Header />
        <EditCard />
      </>,
  },
  {
    path: "/:email/list/postcard",
    element:
      <>
        <Header />
        <ContCard />
      </>,
  },
  {
    path: '/:email/list/users',
    element:
      <>
        <Header />
        <UserList />
      </>
  },
  {
    path: '/:email/list/users/:id/edit',
    element:
      <>
        <Header />
        <UserEdit />
      </>
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
