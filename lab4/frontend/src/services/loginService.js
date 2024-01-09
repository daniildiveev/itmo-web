export const login = (username, password) => {
    if (username === '1' && password === '1') {
        return {
            id: 1,
            username: '1'
        };
    }
    throw new Error('Invalid username or password');
}