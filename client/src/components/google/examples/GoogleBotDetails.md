```jsx
import Button from "@material-ui/core/Button";

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

const BotDetailsContainer = () => {
  const [bot, setBot] = React.useState(null);

  return (
    <>
      <Button
        onClick={() => {
          setBot(googleBot);
        }}
      >
        View Bot Details
      </Button>
      <GoogleBotDetails
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
