import {API_HOST_URL, CREATE_HIT, HITS} from "./urlConfig";

export const sendPoint = async (x, y, r, jwt) => {
    const body = {
        x: x,
        y: y,
        r: r
    }

    const params = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }

    const url = API_HOST_URL + HITS + CREATE_HIT;

    const response = await fetch(url, params)
    const responseData = await response.json();

    return responseData.data["New element added"]
}

export const getAllPoints = async (jwt) => {
    const params = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }

    let url = API_HOST_URL + HITS;
    const response = await fetch(url, params)
    return await response.json();
}