interface BaseAd {
  id: string;
  tags: Tag[]; // TODO: define tag interface
  image: string;
}

interface GoogleAd extends BaseAd {
  headline: string;
  html: string;
  loggedIn: boolean;
  bot: GoogleBot;
  seenOn: string;
  createdAt: string;
  adLink: string;
}

type TwitterAdType = "AD_TYPE_UNSPECIFIED" | "AD_TYPE_TWEET" | "AD_TYPE_FOLLOW";

interface TwitterAd extends BaseAd {
  promoterHandle: string;
  content: string;
  seenInstances: TwitterSeenInstances[];
  officialLink: string;
  tweetLink: string;
  adType: TwitterAdType;
}

type TwitterSeenInstances = {
  bot: TwitterBot;
  adId: string;
  adSeenId: string;
  botId: string;
  createdAt: string;
};

type TwitterBotWithSeenInstances = TwitterBot & {
  createdAt: string[];
};

type Ad = GoogleAd | TwitterAd;

interface BaseBot {
  id: string;
  username: string;
  politicalRanking: number;
}

interface GoogleBot extends BaseBot {
  dob: Date;
  fName: string;
  gender: string;
  lName: string;
  locLat: number;
  locLong: number;
  otherTermsCategory: number;
  password: string;
  type: string;
}

interface TwitterBot extends BaseBot {}

type Bot = GoogleBot | TwitterBot;

interface Tag {
  id: number;
  name: string;
}

interface CategoryData {
  name: string;
  selection: boolean;
}
