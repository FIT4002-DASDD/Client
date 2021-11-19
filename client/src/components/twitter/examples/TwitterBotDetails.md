```jsx
import Button from "@material-ui/core/Button";

const twitterBot = {
  id: "bot-id",
  username: "iamabot",
  politicalRanking: 4,
  dob: "1985-05-06 14:00:00.000000",
  type: "america",
  followedAccounts: ["@follow1", "@follow2"],
  relevantTags: ["#tag1", "#tag2"],
};

const BotDetailsContainer = () => {
  const [bot, setBot] = React.useState(null);

  return (
    <>
      <Button
        onClick={() => {
          setBot(twitterBot);
        }}
      >
        View Bot Details
      </Button>
      <TwitterBotDetails
        bot={bot}
        handleClose={() => {
          setBot(null);
        }}
      />
    </>
  );
};

<BotDetailsContainer />;
```
