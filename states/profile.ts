import {proxy} from 'valtio';
import {getProfile} from '../lib/fetcher';
import {useEffect, useState} from 'react';


interface IProfile {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

const profileState = proxy<IProfile>({});

export default profileState;

export const profileActions = {
    refresh: async () => {
        // if server
        if (typeof window === 'undefined') {
            return;
        }
        const profile = await getProfile();
        if (profile) {
            profileState.id = profile.id;
            profileState.firstName = profile.firstName || undefined;
            profileState.lastName = profile.lastName || undefined;
            profileState.phone = profile.phone;
        }
    },
    reset: () => {
        profileState.id = undefined;
        profileState.firstName = undefined;
        profileState.lastName = undefined;
        profileState.phone = undefined;
    },
};

export const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!profileState.phone);

    useEffect(() => {
        setIsLoggedIn(!!profileState.phone);
        profileActions.refresh().then(() => {
            setIsLoggedIn(!!profileState.id);
        });
    }, []);
    return isLoggedIn;
};

(async () => {
    await profileActions.refresh();
})();
