import { AlertTriangle } from 'lucide-react';
import { useModalStore } from '@/store/modal-store';
import ModalWrapper from '@/components/modal-wrapper';
import Button from '@/components/ui/button';
import { useDeleteMember } from '../hooks/use-member-mutation';

export default function DeleteMemberModal() {
    const { isOpen, view, data, closeModal } = useModalStore();


    const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

    const isModalOpen = isOpen && view === 'DELETE_MEMBER';

    const handleDelete = () => {

        if (!data?.id) return;


        deleteMember(data.id, {
            onSuccess: () => {

                closeModal();
            }
        });
    };

    return (
        <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title="Delete Member">
            <div className="space-y-4">

                <div className="flex items-start p-4 space-x-3 bg-red-50 text-red-800 rounded-lg border border-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                        Are you sure you want to delete <strong>{data?.firstName} {data?.lastName}</strong>?
                        This action cannot be undone and all associated records will be permanently removed.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-zinc-100">

                    <Button type="button" variant="secondary" onClick={closeModal} disabled={isDeleting}>
                        Cancel
                    </Button>

                    <Button type="button" variant="danger" isLoading={isDeleting} onClick={handleDelete}>
                        Yes, Delete Member
                    </Button>
                </div>

            </div>
        </ModalWrapper>
    );
}