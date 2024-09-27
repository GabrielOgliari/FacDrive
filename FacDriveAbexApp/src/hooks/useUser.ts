import { useRef, useState } from 'react';
import StorageService from '../services/storage-service/storage-service';

export const useUser = () => {
    const [userId, setUserId] = useState<string | null>()

    const userIdAsync = StorageService.get('user_id');

    userIdAsync.then((value: string | null) => {setUserId(value)})

    return Number(userId);
};
