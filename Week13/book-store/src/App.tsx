import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
    errorElement : <Error/>
  },
  {
    path: "/books",
    element: <Layout><div>도서 목록</div></Layout>
  },
  {
    path: "/signup",
    element: <Layout><Signup/></Layout>
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
        <RouterProvider router={router}/>
    </BookStoreThemeProvider>
  )
  
}

export default App;
