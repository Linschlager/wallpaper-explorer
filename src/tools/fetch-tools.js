const url = `https://api.reddit.com/r/wallpaper/`;

let nextPage = undefined;

export default async () => {
  let completeUrl =
    url + "?count=25" + (nextPage !== undefined ? `&after=${nextPage}` : "");

  const res = await fetch(completeUrl);
  const json = await res.json();
  nextPage = json.data.after;
  return json;
};
