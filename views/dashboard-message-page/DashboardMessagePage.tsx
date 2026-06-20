'use client';
import SearchInput from '@/components/search-input/SearchInput'
import MessageDialog from '@/components/message-dialog/MessageDialog'
import { Mail } from 'lucide-react'
import { useState, useEffect } from 'react';
import { MessageService, MessageData } from '@/services/message.service';

function DashboardMessagePage() {
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [filteredMessagesList, setFilteredMessagesList] = useState<MessageData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await MessageService.getAllMessages();
            if (res?.data?.contacts) {
                setMessages(res.data.contacts);
            } else if (Array.isArray(res)) {
                setMessages(res);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        let currentList = [...messages];

        // Apply read/unread filter
        if (filter === 'unread') currentList = currentList.filter(m => !m.isRead);
        if (filter === 'read') currentList = currentList.filter(m => m.isRead);

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            currentList = currentList.filter(m =>
                m.name.toLowerCase().includes(query) ||
                m.email.toLowerCase().includes(query) ||
                m.subject.toLowerCase().includes(query) ||
                m.message.toLowerCase().includes(query)
            );
        }

        setFilteredMessagesList(currentList);
    }, [messages, filter, searchQuery]);

    const handleMessageClick = async (msg: MessageData) => {
        setSelectedMessage(msg);
        setIsDialogOpen(true);

        // Mark as read optionally
        if (!msg.isRead && msg._id) {
            try {
                await MessageService.updateMessage(msg._id, { isRead: true });
                // Optimistic UI update
                setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
            } catch (error) {
                console.error("Failed to mark as read", error);
            }
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            await MessageService.deleteMessage(id);
            setMessages(prev => prev.filter(m => m._id !== id));
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete message');
        }
    };

    const unreadCount = messages.filter(m => !m.isRead).length;

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className='space-y-8 w-full '>
            {/* Custom Header for Messages as per design */}
            <div className='space-y-1'>
                <h1 className='text-3xl font-bold'>Messages</h1>
                <p className='text-muted-foreground'>{unreadCount} unread messages</p>
            </div>

            <div className='flex flex-wrap gap-4 items-center'>
                <div className='w-[400px]'>
                    <SearchInput
                        id='searchmessages'
                        placeholder='Search messages...'
                        search={(val) => setSearchQuery(val)}
                    />
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
                {loading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading messages...</div>
                ) : filteredMessagesList.map((message) => (
                    <div
                        key={message._id}
                        onClick={() => handleMessageClick(message)}
                        className={`flex gap-4 p-5 rounded-xl border transition-colors cursor-pointer hover:border-foreground/20 ${message.isRead ? 'bg-card border-border' : 'bg-card border-border'}`}
                    >
                        {/* Icon */}
                        <div className="shrink-0 mt-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.isRead ? 'bg-accent text-muted-foreground' : 'bg-[color:var(--portfolio-accent)] text-white'}`}>
                                <Mail className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 truncate">
                                    <span className={`font-semibold text-base truncate ${!message.isRead ? 'text-foreground' : 'text-foreground/90'}`}>
                                        {message.name}
                                    </span>
                                    {!message.isRead && (
                                        <span className="bg-[color:var(--portfolio-accent)]/10 text-[color:var(--portfolio-accent)] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                            New
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                                    {formatDate(message.createdAt)}
                                </span>
                            </div>

                            <div className="text-sm text-muted-foreground truncate">
                                {message.email}
                            </div>

                            <div className={`text-sm font-medium pt-1 truncate ${!message.isRead ? 'text-foreground' : 'text-foreground/80'}`}>
                                {message.subject}
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {message.message}
                            </p>
                        </div>
                    </div>
                ))}

                {!loading && filteredMessagesList.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl border-border">
                        No messages found matching your criteria.
                    </div>
                )}
            </div>

            <MessageDialog isOpen={isDialogOpen} setOpen={setIsDialogOpen} message={selectedMessage} onDelete={() => handleDelete(selectedMessage?._id)} />
        </div>
    )
}

export default DashboardMessagePage
