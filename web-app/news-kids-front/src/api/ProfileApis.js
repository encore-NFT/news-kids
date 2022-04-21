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

    getEditProfileList(TOKEN) {
        return AxiosInstance({
            url: 'http://localhost:8000/api/user/edit',
            method: 'get',
            headers: {
                'Authorization': TOKEN,
            },
        });
    },

    postEditProfileList(editData) {
        const { data, TOKEN } = editData;
        const { user_name, user_nickname, user_introduce, user_email } = data;

        return AxiosInstance({
            url: 'http://localhost:8000/api/user/edit',
            method: 'post',
            headers: {
                'Authorization': TOKEN,
            },
            data: { user_name, user_nickname, user_introduce, user_email },
        });
    },
}

export default ProfileApis;