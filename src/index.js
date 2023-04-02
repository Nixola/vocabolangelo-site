import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import Parolangelo from "./routes/Parolangelo";
import {ConceptLayout} from "./routes/ConceptLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
    {
        path: "/parolangelo",
        element: <Parolangelo/>,
    },
    {
        path: "parolangelo/:concept",
        element: <ConceptLayout />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
                <RouterProvider router={router}/>
        </React.StrictMode>
);
