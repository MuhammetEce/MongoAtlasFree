export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const parser = (data: any[], value) => {
  data.map((m) => {
    m[value] = JSON.parse(m[value]);
  });
  return data;
};

export const shuffle = (arr: any) => {
  return arr.sort(() => Math.random() - 0.5);
};
