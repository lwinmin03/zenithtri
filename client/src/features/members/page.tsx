import { useState } from "react"
import Button from "@/components/ui/button"
import SearchInput from "@/components/ui/search-input"
import { useModalStore } from "@/store/modal-store"
import MemberContainer from "./components/memeber-container"



const MemberPage = () => {
    const [keyword, setKeyword] = useState<string>('');
    console.log(keyword);

    const openModal = useModalStore((state) => state.openModal);
    return (
        <div className="w-full h-full mt-4">

            <div className="flex items-center justify-between">
                <SearchInput placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />

                <Button variant="secondary" onClick={() => openModal('CREATE_MEMBER')}>
                    Add Member
                </Button>
            </div>
            <MemberContainer keyword={keyword} />


        </div>
    )
}

export default MemberPage