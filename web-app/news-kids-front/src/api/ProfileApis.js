import AxiosInstance from './AxiosInstance';

const ProfileApis = {
    getProfileList(TOKEN) {
        return AxiosInstance({
            url: 'http://localhost:8000/api/user/profile',
            method: 'get',
            headers: {
                'Authorization': TOKEN,
            },

        });
    },
}

export default ProfileApis;