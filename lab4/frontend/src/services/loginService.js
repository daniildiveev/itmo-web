export const authenticate = async (username, password, register) => {
    const body = {
        username: username,
        password: password
    }

    const params = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let url;

    if (register) {
        url = "http://localhost:8080/authentication/register";
    } else {
        url = "http://localhost:8080/authentication/login";
    }

    const response = await fetch(url, params);
    const responseData = await response.json()

    return {
        message: responseData.message,
        jwt: responseData.jwt
    };
}