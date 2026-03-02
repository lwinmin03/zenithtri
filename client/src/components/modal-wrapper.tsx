import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function ModalWrapper({ isOpen, onClose, title, children }: ModalWrapperProps) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm transition-opacity">


            <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
                    <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}