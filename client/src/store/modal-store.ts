import { create } from 'zustand';

export type ModalView = 'CREATE_MEMBER' | 'EDIT_MEMBER' | 'DELETE_MEMBER' | null;

interface ModalState {
    isOpen: boolean;
    view: ModalView;
    data: any;
    openModal: (view: ModalView, data?: any) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    view: null,
    data: null,
    openModal: (view, data = null) => set({ isOpen: true, view, data }),
    closeModal: () => set({ isOpen: false, view: null, data: null }),
}));