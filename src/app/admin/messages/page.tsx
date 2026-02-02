'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function AdminMessagesPage() {
    const [chats, setChats] = useState<any[]>([])
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [messages, setMessages] = useState<any[]>([])
    const [reply, setReply] = useState('')
    const [loading, setLoading] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchChats()
        const interval = setInterval(fetchChats, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat)
            const interval = setInterval(() => fetchMessages(selectedChat), 5000)
            return () => clearInterval(interval)
        }
    }, [selectedChat])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const fetchChats = async () => {
        try {
            const res = await fetch('/api/messages')
            const allMessages = await res.json()

            if (!Array.isArray(allMessages)) {
                console.error('Expected array from messages API, got:', allMessages)
                setChats([])
                setLoading(false)
                return
            }

            // Group by sender
            const grouped = allMessages.reduce((acc: any, msg: any) => {
                if (!acc[msg.sender]) {
                    acc[msg.sender] = {
                        sender: msg.sender,
                        lastMessage: msg.content,
                        timestamp: msg.createdAt,
                        unread: !msg.isAdmin
                    }
                } else {
                    acc[msg.sender].lastMessage = msg.content
                    acc[msg.sender].timestamp = msg.createdAt
                    if (!msg.isAdmin) acc[msg.sender].unread = true
                }
                return acc
            }, {})

            setChats(Object.values(grouped).sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
            setLoading(false)
        } catch (error) { }
    }

    const fetchMessages = async (sender: string) => {
        try {
            const res = await fetch(`/api/messages?sender=${sender}`)
            const data = await res.json()
            setMessages(data)
        } catch (error) { }
    }

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!reply.trim() || !selectedChat) return

        const newMessage = {
            content: reply,
            sender: selectedChat,
            isAdmin: true
        }

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            })
            setReply('')
            fetchMessages(selectedChat)
        } catch (error) { }
    }

    return (
        <div className="h-[calc(100vh-120px)] flex bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-100 flex flex-col">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-black text-gray-800">কাস্টমার মেসেজ</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <p className="p-6 text-center text-gray-400">লোড হচ্ছে...</p>
                    ) : chats.length === 0 ? (
                        <p className="p-6 text-center text-gray-400">কোনো মেসেজ নেই</p>
                    ) : (
                        chats.map((chat) => (
                            <button
                                key={chat.sender}
                                onClick={() => setSelectedChat(chat.sender)}
                                className={`w-full p-6 text-left border-b border-gray-50 transition-all hover:bg-gray-50 ${selectedChat === chat.sender ? 'bg-green-50/50 border-r-4 border-r-primary' : ''}`}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-gray-800 truncate">কাস্টমার: {chat.sender.slice(-5)}</span>
                                    <span className="text-xs text-gray-400">{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col bg-gray-50/30">
                {selectedChat ? (
                    <>
                        <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">চ্যাট উইন্ডো ({selectedChat})</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-4 rounded-3xl shadow-sm ${msg.isAdmin ? 'bg-primary text-white' : 'bg-white text-gray-800'}`}>
                                        <p className="text-sm font-medium">{msg.content}</p>
                                        <span className={`text-[10px] block mt-1 opacity-70 ${msg.isAdmin ? 'text-white' : 'text-gray-400'}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleReply} className="p-6 bg-white border-t border-gray-100 flex gap-4">
                            <input
                                type="text"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                className="flex-1 px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition"
                                placeholder="রিপ্লাই লিখুন..."
                            />
                            <button type="submit" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary transition active:scale-95 shadow-lg shadow-primary/20">
                                সেন্ড
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
                        মেসেজ দেখতে কাস্টমার নির্বাচন করুন
                    </div>
                )}
            </div>
        </div>
    )
}
