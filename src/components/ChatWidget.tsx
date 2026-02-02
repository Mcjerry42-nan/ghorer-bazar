'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Generate or get session ID for the user
        let id = localStorage.getItem('chat_session_id')
        if (!id) {
            id = 'sess_' + Math.random().toString(36).substr(2, 9)
            localStorage.setItem('chat_session_id', id)
        }
        setSessionId(id)
    }, [])

    useEffect(() => {
        if (isOpen && sessionId) {
            fetchMessages()
            const interval = setInterval(fetchMessages, 5000) // Poll every 5s
            return () => clearInterval(interval)
        }
    }, [isOpen, sessionId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const fetchMessages = async () => {
        try {
            const res = await fetch(`/api/messages?sender=${sessionId}`)
            const data = await res.json()
            if (Array.isArray(data)) {
                setMessages(data)
            } else {
                console.error('Invalid messages response:', data)
                setMessages([])
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error)
            setMessages([])
        }
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const newMessage = {
            content: input,
            sender: sessionId,
            isAdmin: false
        }

        // Optimistic update
        setMessages([...messages, { ...newMessage, createdAt: new Date().toISOString() }])
        setInput('')

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            })
            fetchMessages()
        } catch (error) { }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Chat Box */}
            {isOpen && (
                <div className="bg-white w-80 sm:w-96 h-[500px] rounded-3xl shadow-2xl border border-gray-100 flex flex-col mb-4 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="p-4 bg-primary text-white rounded-t-3xl flex justify-between items-center shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">💬</div>
                            <div>
                                <h3 className="font-bold">সরাসরি চ্যাট</h3>
                                <p className="text-xs text-white/80">আমরা অনলাইনে আছি</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-2xl">×</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-400 text-sm">আপনাকে কীভাবে সাহায্য করতে পারি? আমাদের একটি মেসেজ দিন!</p>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm font-medium ${msg.isAdmin ? 'bg-white text-gray-800' : 'bg-primary text-white'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="p-4 bg-white rounded-b-3xl border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 px-4 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition"
                            placeholder="মেসেজ লিখুন..."
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-xl hover:bg-secondary transition active:scale-95">
                            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 group"
            >
                {isOpen ? (
                    <span className="text-3xl">×</span>
                ) : (
                    <div className="relative">
                        <span className="text-3xl">💬</span>
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                    </div>
                )}
            </button>
        </div>
    )
}
