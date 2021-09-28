export const storePortfolio = (portfolio) => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
}

export const retrievePortfolio = () => {
    if(localStorage.getItem("portfolio")) {
        return JSON.parse(localStorage.getItem("portfolio"));
    } else {
        return [];
    }
}