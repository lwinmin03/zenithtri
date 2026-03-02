import React, { useState } from 'react';
import { useModalStore } from '../../../store/modal-store';
import ModalWrapper from '../../../components/modal-wrapper';
import Button from '../../../components/ui/button';
import { useCreateMember } from '../hooks/use-member-mutation';



export default function CreateMemberModal() {

    const { isOpen, view, closeModal } = useModalStore();
    const { mutate: create, isPending } = useCreateMember();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', dateOfBirth: '', insuranceId: '', dob: '' });




    const isModalOpen = isOpen && view === 'CREATE_MEMBER';

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const formattedDate = new Date(formData.dateOfBirth).toISOString();


        const payload = {
            ...formData,
            dateOfBirth: formattedDate
        };
        create(payload,
            {
                onSuccess: () => {
                    setFormData({ firstName: '', lastName: '', dateOfBirth: '', insuranceId: '', dob: '' });
                    closeModal();
                }
            }
        )


    };

    return (
        <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title="Add New Member">
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-700">First Name</label>
                        <input
                            required
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-700">Last Name</label>
                        <input
                            required
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-700">Insurance ID</label>
                    <input
                        required
                        type="text"
                        value={formData.insuranceId}
                        onChange={(e) => setFormData({ ...formData, insuranceId: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>


                <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-700">Date of Birth</label>
                    <input
                        required
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>


                <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-zinc-100">
                    <Button type="button" variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isPending}>
                        Save Member
                    </Button>
                </div>

            </form>
        </ModalWrapper>
    );
}