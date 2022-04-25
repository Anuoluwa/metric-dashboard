const transformData = (data) => {
  const res = data.map((item) => ({
    date: new Date(item._time).toLocaleString("en-US"),
    value: item._value,
  }));
  return res;
};

export default transformData;
