import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export interface NotificationState {
    message: string;
    type: 'success' | 'error';
}

interface NotificationProps {
    notification: NotificationState | null;
    onClose: () => void;
    duration?: number;
}

export default function Notification({ notification, onClose, duration = 4000 }: NotificationProps) {
    useEffect(() => {
        if (notification && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [notification, duration, onClose]);

    if (!notification) return null;

    const { message, type } = notification;

    const bgColor = type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800';
    const textColor = type === 'success' ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300';
    const Icon = type === 'success' ? CheckCircle2 : XCircle;
    const iconColor = type === 'success' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in ${bgColor}`}>
            <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
            <button
                onClick={onClose}
                className={`ml-4 shrink-0 hover:opacity-70 transition-opacity ${textColor}`}
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
