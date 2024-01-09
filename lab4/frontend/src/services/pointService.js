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

    const response = await fetch("http://localhost:8080/hits/add", params)
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

    const response = await fetch("http://localhost:8080/hits/", params)
    return await response.json();
}