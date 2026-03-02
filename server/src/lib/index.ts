import { HttpException, HttpStatus } from '@nestjs/common';

export interface IResponseDto<T> {
    status: string;
    statusCode: number;
    timestamp: string;
    message: string;
    payload: T;
    pagination?: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        pageSize: number;
        totalItems: number;
    };
    error?: {
        detailMessage: string;
        referenceId: string;
    };
}

export class ResponseDto<T> implements IResponseDto<T> {
    status: string;
    statusCode: number;
    type: string;
    timestamp: string;
    message: string;
    signature: string;
    payload: T;
    pagination?: IResponseDto<T>['pagination'];
    error?: IResponseDto<T>['error'];

    constructor(data: Partial<IResponseDto<T>>) {
        Object.assign(this, data);
    }

    // Enhanced to accept pagination and dynamic status codes
    static success<T>(
        payload: T,
        statusCode: number = HttpStatus.OK,
        pagination?: IResponseDto<T>['pagination']
    ): IResponseDto<T> {
        return {
            status: 'success',
            statusCode,
            timestamp: new Date().toISOString(),
            message: 'Request successful',
            payload,
            pagination,
        };
    }

    static error<T>(
        message: string,
        statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
        detailMessage: string = '',
    ): IResponseDto<T> {
        return {
            status: 'error',
            statusCode,
            timestamp: new Date().toISOString(),
            message,
            payload: null as unknown as T,
            error: {
                detailMessage,
                referenceId: '',
            },
        };
    }
}

// Enhanced to accept status code and pagination
export async function handleRequest<T>(
    operation: () => Promise<{ payload: T; pagination?: IResponseDto<T>['pagination'] } | T>,
    statusCode: number = HttpStatus.OK
): Promise<IResponseDto<T>> {
    try {
        const result = await operation();

        // Check if the service returned payload + pagination separately
        if (result && typeof result === 'object' && 'payload' in result && 'pagination' in result) {
            return ResponseDto.success(result.payload, statusCode, result.pagination);
        }

        // Standard response without pagination
        return ResponseDto.success(result as T, statusCode);
    } catch (error: any) {
        if (error instanceof HttpException) {
            return ResponseDto.error<T>(error.message, error.getStatus(), error.name);
        }
        console.error('Unhandled error:', error);
        return ResponseDto.error<T>('An unexpected error occurred');
    }
}