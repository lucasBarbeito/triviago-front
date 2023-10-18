'use client'
import React from 'react';
import UserProfile from '@/components/UserProfile';

const Page = () => {

    const currentUser = {
        email: 'usuario@mail.com',
        firstName: 'Nombre',
        lastName: 'Apellido',
        birthDate: '04/07/1999',
        createdAt: '05/06/2023'
    };

    return (
            <UserProfile
                email={currentUser.email}
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
                birthDate={currentUser.birthDate}
                createdAt={currentUser.createdAt}
                isCurrentUser={false}
            />

    );
};

export default Page;
