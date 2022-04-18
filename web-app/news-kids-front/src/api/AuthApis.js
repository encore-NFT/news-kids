import AxiosInstance from "./AxiosInstance";

const AuthApis = {
    postRegister(data) {
        const { name, nickname, email, password } = data;

        console.log('postRegister값', data);

        return AxiosInstance({
            url: 'http://localhost:8000/api/user/signup',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { name, nickname, email, password },
        });
    },
}

export default AuthApis;