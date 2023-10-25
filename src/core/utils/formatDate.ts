function formatDate(dateUnhandled: string | null): string | null {
  if (!dateUnhandled) {
    return null;
  }
  const date = new Date(dateUnhandled);
  const nowDate = new Date();
  const allMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const currentMonth = allMonths[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const delay = nowDate.getDate() - day;

  let resultDate = `${day}${currentMonth}`;

  if (delay < 1) {
    resultDate = `${hours}:${minutes}`;
  }

  if (delay === 1) {
    resultDate = 'Вчера';
  }

  return resultDate;
}

export default formatDate;
