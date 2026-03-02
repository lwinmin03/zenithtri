import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/main-layout";
import MemberPage from "../features/members/page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                element: <MemberPage />,
                index: true
            }
        ]
    }
])

export default router;