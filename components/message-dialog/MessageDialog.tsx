import React from 'react'
import { X } from 'lucide-react'

import { MessageData } from '@/services/message.service'

interface MessageDialogProps {
    isOpen: boolean;
    setOpen: (val: boolean) => void;
    message: MessageData | null;
    onDelete?: () => void;
}

function MessageDialog({ isOpen, setOpen, message, onDelete }: MessageDialogProps) {
    if (!message) return null;

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:p-4 justify-center z-50 ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm overflow-auto`}>
            <div className='relative w-full max-w-2xl p-6 bg-background rounded-xl border border-border shadow-lg flex flex-col gap-6'>
                {/* Close Button top right */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className='space-y-1 pr-8'>
                    <h2 className='text-xl font-bold text-foreground'>{message.subject}</h2>
                    <p className='text-sm text-muted-foreground'>
                        From: <span className="text-foreground/90">{message.name}</span> ({message.email})
                    </p>
                </div>

                {/* Meta details */}
                <div className="text-sm text-muted-foreground pt-2">
                    Received: {formatDate(message.createdAt)}
                </div>

                {/* Divider */}
                <hr className="border-t border-border" />

                {/* Message Body */}
                <div className="text-base text-foreground leading-relaxed whitespace-pre-wrap min-h-[120px]">
                    {message.message}
                </div>

                {/* Divider */}
                <hr className="border-t border-border" />

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-2">
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 border border-border rounded-lg text-destructive hover:bg-destructive/10 font-medium transition-colors"
                    >
                        Delete
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setOpen(false)}
                            className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-accent font-medium transition-colors"
                        >
                            Close
                        </button>
                        <a
                            href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                            className="px-6 py-2 border bg-foreground border-foreground rounded-lg text-background font-medium hover:opacity-90 transition-opacity"
                        >
                            Reply
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageDialog
