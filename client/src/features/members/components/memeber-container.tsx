import { useState } from 'react';
import Pagination from '../../../components/ui/pagination';
import { useMembers } from '../hooks/use-member-query';
import InsuranceTable from './Insurance-table';
import { useDebounce } from '../../../hooks/use-debounce';


interface MemberContainerProps {
    keyword?: string;
}

const MemberContainer = ({ keyword }: MemberContainerProps) => {
    const [page, setPage] = useState(1);
    const debounceValue = useDebounce(keyword ?? '');

    const { data: members, isLoading } = useMembers({
        limit: 10,
        page,
        search: debounceValue
    });




    return (
        <div className='py-6'>

            <div className='w-full '>
                <InsuranceTable data={members?.payload ?? []} isLoading={isLoading} />
            </div>

            <div className="absolute bottom-2 w-full left-0 right-0 px-4">
                <Pagination

                    currentPage={page}
                    hasPrev={members?.pagination?.hasPreviousPage ?? false}
                    hasNext={members?.pagination?.hasNextPage ?? false}
                    // 3. Receive the new page number and update the state
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>

        </div>
    );
};

export default MemberContainer;