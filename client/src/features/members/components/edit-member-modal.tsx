import React, { useState, useEffect } from 'react';
import { useModalStore } from '../../../store/modal-store';
import ModalWrapper from '../../../components/modal-wrapper';
import Button from '../../../components/ui/button';
import { useUpdateMember } from '../hooks/use-member-mutation';

export default function EditMemberModal() {
    const { isOpen, view, data, closeModal } = useModalStore();
    const { mutate: update, isPending } = useUpdateMember();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', dateOfBirth: '' });

    const isModalOpen = isOpen && view === 'EDIT_MEMBER';


    useEffect(() => {
        if (isModalOpen && data) {

            const formattedDateForInput = data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString().split('T')[0]
                : '';

            setFormData({
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                dateOfBirth: formattedDateForInput,
            });
        }
    }, [isModalOpen, data]);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();


        if (!data?.id) return;


        const strictIsoDate = new Date(formData.dateOfBirth).toISOString();
        update(
            {
                id: data.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: strictIsoDate,
            },
            {
                onSuccess: () => {

                    closeModal();
                }
            }
        );
    };

    return (
        <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title="Edit Member">
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-700">First Name</label>
                        <input
                            required
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-700">Last Name</label>
                        <input
                            required
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>


                <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-700">Date of Birth</label>
                    <input
                        required
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-zinc-100">

                    <Button type="button" variant="secondary" onClick={closeModal} disabled={isPending}>
                        Cancel
                    </Button>

                    <Button isLoading={isPending}>
                        Save Changes
                    </Button>
                </div>

            </form>
        </ModalWrapper>
    );
}