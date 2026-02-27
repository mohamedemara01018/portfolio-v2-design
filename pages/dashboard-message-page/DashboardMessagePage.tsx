'use client';
import SearchInput from '@/components/search-input/SearchInput'
import MessageDialog, { Message } from '@/components/message-dialog/MessageDialog'
import { Mail } from 'lucide-react'
import { useState } from 'react';

function DashboardMessagePage() {
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            name: "Sarah Chen",
            email: "sarah@example.com",
            subject: "Collaboration Opportunity",
            excerpt: "Hi, I came across your portfolio and I'm impressed with your work. I'd love to discuss a potential collaboration on a new project we're working on. Are you available for a call next week?",
            date: "2 days ago",
            read: false
        },
        {
            id: 2,
            name: "Michael Brown",
            email: "michael@example.com",
            subject: "Question about React Project",
            excerpt: "I noticed your e-commerce platform project. Could you share more details about the architecture and tech stack you used? I'm working on something similar.",
            date: "2 days ago",
            read: false
        },
        {
            id: 3,
            name: "Emily Davis",
            email: "emily@example.com",
            subject: "Job Opening",
            excerpt: "We have a senior frontend developer position that might interest you. Your portfolio shows exactly the kind of skills we're looking for.",
            date: "3 days ago",
            read: true
        }
    ]);

    const handleMessageClick = (msg: Message) => {
        setSelectedMessage(msg);
        setIsDialogOpen(true);

        // Mark as read optionally
        if (!msg.read) {
            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
        }
    };

    const unreadCount = messages.filter(m => !m.read).length;

    const filteredMessages = messages.filter(m => {
        if (filter === 'unread') return !m.read;
        if (filter === 'read') return m.read;
        return true;
    });

    return (
        <div className='space-y-8 w-full '>
            {/* Custom Header for Messages as per design */}
            <div className='space-y-1'>
                <h1 className='text-3xl font-bold'>Messages</h1>
                <p className='text-muted-foreground'>{unreadCount} unread messages</p>
            </div>

            <div className='flex flex-wrap gap-4 items-center'>
                <div className='w-[400px]'>
                    <SearchInput id='searchmessages' placeholder='Search messages...' onClick={() => { }} />
                </div>

                <div className='flex items-center gap-1 bg-muted p-1 rounded-md border border-border'>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-background shadow-xs border border-border text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'unread' ? 'bg-background shadow-xs border border-border text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Unread ({unreadCount})
                    </button>
                    <button
                        onClick={() => setFilter('read')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'read' ? 'bg-background shadow-xs border border-border text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Read
                    </button>
                </div>
            </div>

            <div className='space-y-4'>
                {filteredMessages.map((message) => (
                    <div
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`flex gap-4 p-5 rounded-xl border transition-colors cursor-pointer hover:border-foreground/20 ${message.read ? 'bg-card border-border' : 'bg-card border-border'}`}
                    >
                        {/* Icon */}
                        <div className="shrink-0 mt-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.read ? 'bg-accent text-muted-foreground' : 'bg-[color:var(--portfolio-accent)] text-white'}`}>
                                <Mail className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 truncate">
                                    <span className={`font-semibold text-base truncate ${!message.read ? 'text-foreground' : 'text-foreground/90'}`}>
                                        {message.name}
                                    </span>
                                    {!message.read && (
                                        <span className="bg-[color:var(--portfolio-accent)]/10 text-[color:var(--portfolio-accent)] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                            New
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                                    {message.date}
                                </span>
                            </div>

                            <div className="text-sm text-muted-foreground truncate">
                                {message.email}
                            </div>

                            <div className={`text-sm font-medium pt-1 truncate ${!message.read ? 'text-foreground' : 'text-foreground/80'}`}>
                                {message.subject}
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {message.excerpt}
                            </p>
                        </div>
                    </div>
                ))}

                {filteredMessages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl border-border">
                        No messages found matching your criteria.
                    </div>
                )}
            </div>

            <MessageDialog isOpen={isDialogOpen} setOpen={setIsDialogOpen} message={selectedMessage} />
        </div>
    )
}

export default DashboardMessagePage
