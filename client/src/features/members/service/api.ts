
import apiClient from "@/config/axios";
import { type Member, type CreateMemberPayload, type UpdateMemberPayload, type FilterMemberDto, type PaginatedResponse, type BackendError, type ApiResponse } from "../../../types/member";

export const createMember = async (formData: CreateMemberPayload): Promise<ApiResponse<Member>> => {
    const response = await apiClient.post<ApiResponse<Member>>('/members', formData);

    if (response.data?.statusCode === 409 || response.data?.status === 'error') {

        return Promise.reject({
            response: {
                data: response.data
            }
        });
    }
    return response.data;
};

export const updateMember = async (formData: UpdateMemberPayload): Promise<Member> => {

    const response = await apiClient.patch<Member>(`/members/${formData?.id}`, formData);
    return response.data;
};

export const deleteMember = async (id: number): Promise<{ success: boolean }> => {

    const response = await apiClient.delete<{ success: boolean }>(`/members/${id}`);
    return response.data;
};


export const getAllMembers = async (
    filters: FilterMemberDto
): Promise<PaginatedResponse<Member>> => {
    const response = await apiClient.get<PaginatedResponse<Member>>('/members', {
        params: filters,
    });
    return response.data;
};