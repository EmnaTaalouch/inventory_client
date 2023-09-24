export const addCartToSession = (_data) => {
    console.log(_data);
    sessionStorage.setItem('cartSession', JSON.stringify(_data));
};

export const getCartSession = () => {
    return JSON.parse(sessionStorage.getItem('cartSession'));
};
