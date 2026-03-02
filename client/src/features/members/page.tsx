import { useState } from "react"
import Button from "@/components/ui/button"
import SearchInput from "@/components/ui/search-input"
import { useModalStore } from "@/store/modal-store"
import MemberContainer from "./components/memeber-container"
import { PlusIcon } from "lucide-react"



const MemberPage = () => {
    const [keyword, setKeyword] = useState<string>('');
    console.log(keyword);

    const openModal = useModalStore((state) => state.openModal);
    return (
        <div className="w-full h-full mt-4">

            <div className="flex w-full items-center justify-between gap-2.5">
                <SearchInput className="sm:w-40 md:w-1/2" placeholder="Search Members" value={keyword} onChange={(e) => setKeyword(e.target.value)} />

                <Button variant="secondary" size="md" onClick={() => openModal('CREATE_MEMBER')}>
                    <PlusIcon size={14} />
                </Button>
            </div>
            <MemberContainer keyword={keyword} />


        </div>
    )
}

export default MemberPage