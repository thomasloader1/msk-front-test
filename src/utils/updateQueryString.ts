const updateQueryString = (
    endpoint: string,
    queryString: string,
    { key, value }: { key: string; value: string }
): string => {
    const currentQuery = new URLSearchParams(queryString);
    if (value) {
        currentQuery.set(key, value);
    } else {
        currentQuery.delete(key);
    }
    const queryParams = currentQuery.toString();
    return `${endpoint}${queryParams ? `?${queryParams}` : ''}`;
};

export default updateQueryString;
