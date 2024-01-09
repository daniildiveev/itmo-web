function checkHit(x, y, r){
    if (x < 0 && y < 0) {
        return Math.sqrt(x * x + y * y) <= r;
    } else if (x < 0 && y > 0) {
        return (2 * x + r) > y;
    } else if (x > 0 && y < 0){
        return (x < r / 2) && (y > -r);
    } return false;
}

export default checkHit;