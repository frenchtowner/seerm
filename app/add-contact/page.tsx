'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient' // adjust path as needed
import { useRouter } from 'next/navigation'

export default function AddContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { error } = await supabase.from('contacts').insert([
            { name, email, phone }
        ])

        if (error) {
            alert('Error saving contact')
            console.error(error)
        } else {
            alert('Contact saved!')
            router.push('/') // or wherever you want to redirect
        }
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Contact</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Contact</button>
            </form>
        </div>
    )
}
