'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
    image: string
}

interface CartContextType {
    cart: CartItem[]
    favorites: number[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    decrementQuantity: (id: number) => void
    toggleFavorite: (id: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [favorites, setFavorites] = useState<number[]>([])

    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        const savedFavorites = localStorage.getItem('favorites')
        if (savedCart) setCart(JSON.parse(savedCart))
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [cart, favorites])

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((i) => i.id !== id))
    }

    const decrementQuantity = (id: number) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === id)
            if (existing && existing.quantity > 1) {
                return prev.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
            }
            return prev.filter((i) => i.id !== id)
        })
    }

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        )
    }

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider
            value={{
                cart,
                favorites,
                addToCart,
                removeFromCart,
                decrementQuantity,
                toggleFavorite,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
