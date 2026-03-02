
export interface FilterMemberDto {
    search?: string | null;
    page?: number;
    limit?: number;
}


export interface ApiResponse<T> {
    status: string;
    statusCode: number;
    data?: T
}

export interface BackendError {
    status: string;
    statusCode: number;
    timestamp: string;
    message: string | string[];
    payload: null;
    error: {
        detailMessage: string;
        referenceId: string;
    };
}

export interface PaginatedResponse<T> {
    payload: T[];
    pagination: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        pageSize: number;
        totalItems: number;
    };
}
export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    insuranceId: string;
    status?: 'Active' | 'Inactive'

}


export type CreateMemberPayload = Omit<Member, 'id'>;

export type UpdateMemberPayload = Partial<Member> & { id: number };