import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import {Provider} from "react-redux";
import Parolangelo from "./routes/Parolangelo";
import {store} from "./redux/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
    {
        path: "/parolangelo",
        element: <Parolangelo/>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
