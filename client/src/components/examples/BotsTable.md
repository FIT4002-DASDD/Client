```jsx
import { DataSource } from "../../helpers/dataSourceEnum";
const source = DataSource.Google;

const googleBot1 = {
  id: "bot1-id",
  username: "iambot1",
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

const googleBot2 = {
  id: "bot2-id",
  username: "iambot2",
  dob: "1987-03-02 14:00:00.000000",
  gender: "Female",
  fName: "Boop",
  lName: "Beep",
  otherTermsCategory: 0,
  password: "opensesame",
  locLat: 43.5803,
  locLong: -82.0302,
  type: "google",
  politicalRanking: 0,
};
<BotsTable source={source} bots={[googleBot1, googleBot2]} />;
```
