function handleChange(e, setFunction) {
    const { name, value } = e.target;
    setFunction((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

export default handleChange;