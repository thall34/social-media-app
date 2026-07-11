function formatBirthday(dateString) {
    const date = dateString.split('T')[0];
    const [year, month, day] = date.split('-');

    return new Intl.DateTimeFormat('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, day)));
};

export default formatBirthday;