/**
 *
 * @param {*} date
 * @returns
 */
const toTimestamp = (date) => {
  return new Date(date).getTime();
};

module.exports = toTimestamp;
