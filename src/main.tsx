import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.scss";
import { PageSimpleForm } from "./pages/PageSimpleForm.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { PageEmployees } from "./pages/PageEmployees.tsx";
import * as config from './config';
import { PageStateForm } from "./pages/PageStateForm.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/simple-form",
				element: config.environment === 'development' ? <PageSimpleForm /> : <Navigate to="/employees" replace />
			},
			{
				path: "/employees",
				element: <PageEmployees />,
			},
			{
				path: "/state-form",
				element: <PageStateForm />,
			},
			{
				path: "/",
				element: <Navigate to="/simple-form" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
