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

    putPassword(passwordData) {
        const { data, TOKEN } = passwordData;
        const { pre_password, new_password, chk_password } = data;

        return AxiosInstance({
            url: 'http://localhost:8000/api/user/edit',
            method: 'put',
            headers: {
                'Authorization': TOKEN,
            },
            data: { pre_password, new_password, chk_password },
        });
    },

    deleteUser(deleteData) {
        const { data, TOKEN } = deleteData;
        const { user_password } = data;

        return AxiosInstance({
            url: 'http://localhost:8000/api/user/edit',
            method: 'delete',
            headers: {
                'Authorization': TOKEN,
            },
            data: { user_password },
        });
    },

    getOtherUser(userData) {
        const { userName, TOKEN } = userData;

        const param = {
            url: 'http://localhost:8000/api/user/profile/' + userName,
            method: 'get'
        }
        if (TOKEN) {
            param['headers'] = { 'Authorization': TOKEN }
        }
        return AxiosInstance(param)
    },
}

export default ProfileApis;