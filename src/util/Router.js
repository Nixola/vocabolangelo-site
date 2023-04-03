import {createBrowserRouter} from "react-router-dom";
import Root from "../routes/Root";
import Parolangelo from "../routes/Parolangelo";
import {ConceptLayout, loader as conceptLoader} from "../routes/ConceptLayout";
import React from "react";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
    {
        path: "/parolangelo",
        element: <Parolangelo/>,
    },
    {
        path: "parolangelo/:conceptId",
        element: <ConceptLayout />
    },
]);