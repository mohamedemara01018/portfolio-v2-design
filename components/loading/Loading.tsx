'use client';

import React from 'react';
import { PuffLoader } from 'react-spinners';

interface LoadingProps {
    size?: number;
    color?: string;
    className?: string;
    label?: string;
    fullPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
    size = 60,
    color = 'var(--portfolio-accent, #6366f1)',
    className = '',
    label,
    fullPage = false,
}) => {
    const content = (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            <PuffLoader color={color} size={size} />
            {label && (
                <p className="text-muted-foreground animate-pulse font-medium">
                    {label}
                </p>
            )}
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-[200px] w-full items-center justify-center">
            {content}
        </div>
    );
};

export default Loading;
