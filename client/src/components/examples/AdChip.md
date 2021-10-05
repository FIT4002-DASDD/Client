```jsx
const googleBot = {
  id: "bot-id",
  username: "iamabot",
  dob: "1985-05-06 14:00:00.000000",
  gender: "Male",
  fName: "Beep",
  lName: "Boop",
  otherTermsCategory: 0,
  password: "hunter4",
  locLat: 42.5803,
  locLong: -83.0302,
  type: "google",
  politicalRanking: 4,
};
const googleAd = {
  id: "ad-id",
  tags: [],
  image: "http://placekitten.com/200/300",
  headline: "This is a headline",
  html: "This is some html",
  loggedIn: true,
  bot: googleBot,
  seenOn: "https://google.com",
  createdAt: "2020-11-09 10:52:56.000000",
  adLink: "http://placekitten.com/200/300",
};

const tag1 = { id: 1, name: "Sports" };
const tag2 = { id: 2, name: "Food" };

<AdChip ad={googleAd} allTags={[tag1, tag2]} />;
```
