"use client";

export function handleContact(
    setActiveContactId: (id: string) => void,
    setMessageMethod: (method: 'email' | 'text' | 'gift') => void,
    setShowComposer: (show: boolean) => void,
    id: string,
    method: 'email' | 'text' | 'gift'
) {
    setActiveContactId(id);
    setMessageMethod(method);
    setShowComposer(true);
}
