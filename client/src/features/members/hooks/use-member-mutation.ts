import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createMember, updateMember, deleteMember } from '../service/api';
import { type CreateMemberPayload, type UpdateMemberPayload, type Member, type BackendError, type ApiResponse } from '../../../types/member';
import toast from 'react-hot-toast';

export const useCreateMember = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Member>, AxiosError<BackendError>, CreateMemberPayload>({
        mutationFn: createMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member created successfully!');
        },
        onError: (error) => {

            const responseData = error.response?.data;

            if (responseData?.message) {

                const errorMessage = Array.isArray(responseData.message)
                    ? responseData.message[0]
                    : responseData.message;

                toast.error(errorMessage);

                toast.error('Failed to create member. Please try again.');
            }
        }
    });
};

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    return useMutation<Member, AxiosError, UpdateMemberPayload>({
        mutationFn: updateMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success("User Updated Succesfully")
        },
        onError: (error) => {
            console.error('Failed to update member:', error.message);
            toast.error((error?.response?.data as any)?.message || 'Failed to update member')
        }
    });
};

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    return useMutation<{ success: boolean }, AxiosError, number>({
        mutationFn: deleteMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member deleted');
        },
        onError: (error) => {
            console.error('Failed to delete member:', error.message);
            toast.error((error?.response?.data as any)?.message || 'Failed to delete member')
        }
    });
};