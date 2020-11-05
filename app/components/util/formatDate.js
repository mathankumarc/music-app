const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.getDate() + '.' + dateObj.getMonth() + '.' + dateObj.getFullYear();
}

export default formatDate;
