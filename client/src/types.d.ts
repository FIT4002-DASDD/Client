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
type TwitterBotType = "america" | "australia" | "unspecified";

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
  password: string;
  dob: Date;
}

interface GoogleBot extends BaseBot {
  fName: string;
  gender: string;
  lName: string;
  locLat: number;
  locLong: number;
  otherTermsCategory: number;
  type: string;
}

interface TwitterBot extends BaseBot {
  phone: string;
  type: TwitterAdType;
  followedAccounts: string[];
  relevantTags: string[];
}

type Bot = GoogleBot | TwitterBot;

interface Tag {
  id: number;
  name: string;
}

interface CategoryData {
  name: string;
  selection: boolean;
}
