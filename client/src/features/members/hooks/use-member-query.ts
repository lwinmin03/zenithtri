import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from '../service/api';
import type { FilterMemberDto } from '../../../types/member';


export const useMembers = (filters: FilterMemberDto) => {
    return useQuery({
        queryKey: ['members', filters.page, filters.limit, filters.search],
        queryFn: () => getAllMembers(filters),

        placeholderData: (previousData) => previousData,
    });
};