```jsx
const twitterBot = {
  id: "bot-id",
  username: "iamabot",
  politicalRanking: 4,
};

const seenInstances = [
  {
    bot: twitterBot,
    adId: "ad-id",
    adSeenId: "seen-id",
    botId: "bot-id",
    createdAt: "2020-11-09 10:52:56.000000",
  },
];

const twitterAd = {
  id: "ad-id",
  tags: [],
  image: "http://placekitten.com/200/300",
  promoterHandle: "@promoter",
  content: "Hi this is a cute kitten",
  seenInstances: seenInstances,
};

const allTags = [{ id: 1, name: "tag" }];
<TwitterAdCard ad={twitterAd} allTags={allTags} onNewTagCreated={() => {}} />;
```
