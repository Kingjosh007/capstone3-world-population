const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default formatNumber;
