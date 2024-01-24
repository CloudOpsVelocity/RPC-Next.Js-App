import { useSession } from 'next-auth/react';
import React from 'react'

export default function useCustomNofication() {
    const {data:session} = useSession()
}
