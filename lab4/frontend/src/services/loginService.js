import {API_HOST_URL, AUTHENTICATION, LOGIN, REGISTER} from "./urlConfig";

export const authenticate = async (username, password, register) => {
    const body = { username, password }

    const params = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let url = API_HOST_URL + AUTHENTICATION;
    url = register ? url + REGISTER : url + LOGIN;

    const response = await fetch(url, params);


    try {
        return await response.json();
    } catch (e) {
        return {
            message: "Service unavailable"
        }
    }
}