import { Outlet } from "react-router-dom"
import Header from "../ui/header"
import CreateMemberModal from "../../features/members/components/create-member-modal"
import EditMemberModal from "../../features/members/components/edit-member-modal"
import DeleteMemberModal from "../../features/members/components/delete-member-modall"


const MainLayout = () => {
    return (
        <div className="w-screen h-screen  bg-zinc-200 overflow-auto font-roboto" >
            <CreateMemberModal />
            <EditMemberModal />
            <DeleteMemberModal />
            <Header />
            <div className="h-full w-full  px-6">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout