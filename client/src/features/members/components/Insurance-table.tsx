import { useModalStore } from '@/store/modal-store';
import Button from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import type { Member } from '@/types/member';

interface InsuranceRecord {
    id?: number;
    firstName: string;
    lastName: string;
    insuranceId: string;
    dateOfBirth: string;
    status: 'Active' | 'Inactive';
}

type TableProps = {
    data: Member[] | [];
    isLoading?: boolean;
    isError?: boolean;
}

export default function InsuranceTable({ data, isLoading }: TableProps) {
    const { openModal } = useModalStore();

    const getStatusColor = (status: InsuranceRecord['status']) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Inactive':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };


    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
    };

    return (

        <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-full align-middle">

                {/* Table Container with shadow and rounded corners */}
                <div className="overflow-hidden border border-zinc-200 rounded-lg shadow-sm bg-white">
                    <table className="min-w-full divide-y divide-zinc-200 text-sm text-left">

                        {/* Table Header */}
                        <thead className="bg-zinc-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold text-zinc-900">First Name</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-zinc-900">Last Name</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-zinc-900">Date of Birth</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-zinc-900">Insurance ID</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-zinc-900">Status</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-zinc-900 text-right">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-zinc-200 bg-white">


                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={`skeleton-${index}`} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-zinc-200 rounded w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-zinc-200 rounded w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-zinc-200 rounded w-28"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-zinc-200 rounded w-32"></div></td>
                                        <td className="px-6 py-4"><div className="h-5 bg-zinc-200 rounded-full w-16"></div></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <div className="h-8 w-8 bg-zinc-200 rounded"></div>
                                                <div className="h-8 w-8 bg-zinc-200 rounded"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : data?.length > 0 ? (

                                /* 2. ACTUAL DATA MAPPING */
                                data.map((person) => (
                                    <tr key={person.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-4 text-zinc-700 whitespace-nowrap">
                                            {person.firstName}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-700 whitespace-nowrap">
                                            {person.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-700 whitespace-nowrap">
                                            {formatDate(person.dateOfBirth)}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 font-mono whitespace-nowrap">
                                            {person.insuranceId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                                    person.status ?? 'Active'
                                                )}`}
                                            >
                                                {person.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">

                                            <div className="flex items-center justify-end space-x-2">
                                                <Button size='sm' variant='ghost' onClick={() => openModal('EDIT_MEMBER', person)} aria-label="Edit Member">
                                                    <PencilIcon className="w-4 h-4" />
                                                </Button>
                                                <Button size='sm' variant='danger' onClick={() => openModal('DELETE_MEMBER', person)} aria-label="Delete Member">
                                                    <Trash2Icon className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (

                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        No members found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}