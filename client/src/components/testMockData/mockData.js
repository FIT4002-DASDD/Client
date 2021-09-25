let mockData = {
  mockGoogleAdWithImg: {
    id: "0fac782a-4897-458b-a9bd-ced8639a36fe",
    botId: "f7bd2258-a38e-4388-b05e-27c6c89956f6",
    createdAt: "2020-11-27T14:12:40.000Z",
    image:
      "https://dasdd-core-stack-dasddadimages-qdzmhix51zg8.s3.amazonaws.com/1606446760980_ad.png",
    headline: "www.global-nikkei.com/nvgfif_en/#utm_source=Nikkei",
    html: "innerHTML",
    adLink: "www.global-nikkei.com/nvgfif_en/#utm_source=Nikkei",
    loggedIn: false,
    seenOn:
      "https://asia.nikkei.com/Spotlight/Environment/US-formally-exits-Paris-Agreement-amid-election-uncertainty",
    bot: {
      id: "f7bd2258-a38e-4388-b05e-27c6c89956f6",
      username: "damiandarsey",
      dob: "1985-04-20T14:00:00.000Z",
      gender: "Male",
      fName: "Damian",
      lName: "DArcey",
      otherTermsCategory: 5,
      password: "k3sDApFb6gKFsGK",
      locLat: 33.4484,
      locLong: -112.074,
      type: "google",
      politicalRanking: 4,
    },
    tags: [
      {
        id: 2,
        name: "tech",
      },
    ],
  },

  mockGoogleAdNoImg: {
    id: "d0fb9976-8e31-4d9f-840d-339427cd802a",
    botId: "131723d9-8239-4b7f-b7a9-141e6db11f0c",
    createdAt: "2020-11-27T14:12:36.000Z",
    image: null,
    headline: null,
    html: "innerHTML",
    adLink: null,
    loggedIn: false,
    seenOn:
      "https://economictimes.indiatimes.com/news/international/world-news",
    bot: {
      id: "131723d9-8239-4b7f-b7a9-141e6db11f0c",
      username: "hahnsursula",
      dob: "1957-08-25T14:00:00.000Z",
      gender: "Female",
      fName: "Ursula",
      lName: "Hahns",
      otherTermsCategory: 3,
      password: "KJHSDF*&$%(*33",
      locLat: 42.5803,
      locLong: -83.0302,
      type: "google",
      politicalRanking: 0,
    },
    tags: [
      {
        id: 2,
        name: "tech",
      },
    ],
  },

  mockGoogleAdNoSeenOn: {
    id: "2a0f3642-2a08-41ba-a735-cc50417f83fb",
    botId: "131723d9-8239-4b7f-b7a9-141e6db11f0c",
    createdAt: "2020-11-27T14:15:36.000Z",
    image:
      "https://dasdd-core-stack-dasddadimages-qdzmhix51zg8.s3.amazonaws.com/1606446936828_ad.png",
    headline: "capitaloneshopping.com/join-capital-one-shopping",
    html: "innerHTML",
    adLink: "capitaloneshopping.com/join-capital-one-shopping",
    loggedIn: false,
    seenOn: "javascript:void('0')",
    bot: {
      id: "131723d9-8239-4b7f-b7a9-141e6db11f0c",
      username: "hahnsursula",
      dob: "1957-08-25T14:00:00.000Z",
      gender: "Female",
      fName: "Ursula",
      lName: "Hahns",
      otherTermsCategory: 3,
      password: "KJHSDF*&$%(*33",
      locLat: 42.5803,
      locLong: -83.0302,
      type: "google",
      politicalRanking: 0,
    },
    tags: [
      {
        id: 2,
        name: "tech",
      },
    ],
  },

  mockGoogleTags: [
    {
      id: 2,
      name: "tech",
    },
  ],

  mockTwitterTags: [
    {
      id: 2,
      name: "tech",
    },
  ],

  mockGoogleBot: {
    id: "f4a44f2d-8c85-4014-b720-3009518744b4",
    username: "awhite2627",
    dob: "1985-05-06T04:00:00.000Z",
    gender: "Female",
    fName: "Allison",
    lName: "White",
    otherTermsCategory: 0,
    password: "AHS528$%",
    locLat: 42.5803,
    locLong: -83.0302,
    type: "google",
    politicalRanking: 4,
  },

  mockTwitterAd: {
    id: "a6581eda-b9ab-49b7-b66c-7a21ce3211fd",
    tags: [],
    image:
      "https://dasdd-core-stack-dasddadimages-1cag3jbw34wo3.s3.ap-southeast-2.amazonaws.com/twitter/Allison45555547_2021-08-26-19_10_13---969de4c5-b923-4da5-b420-1c207bb1e6b9.png",
    promoterHandle: "@promoter",
    content:
      "CRC CARE\n@crcCARE\nDon't know your acid sulfate soil from your elbow? Our 5 October online workshop is for professionals who aren't experts but need to understand and make management decisions about acid sulfate soils. Learn about regulation, investigation & risk assessment. https://crccare.com/events/understanding-acid-sulfate-soils-workshop-occurrence-and-interpretation-for-consultants-and-project-managers…\n1\n6\n24\nPromoted",
    officialLink:
      "https://twitter.com/crcCARE/status/1430434320179601409/photo/1",
    tweetLink: "https://twitter.com/crcCARE/status/1430434320179601409",
    adType: "AD_TYPE_TWEET",
    seenInstances: [
      {
        bot: {
          id: "Allison45555547",
          username: "Allison45555547",
          politicalRanking: 4,
        },
        adId: "a6581eda-b9ab-49b7-b66c-7a21ce3211fd",
        adSeenId: "1",
        botId: "Allison45555547",
        createdAt: "2021-08-26 01:10:14.463873",
      },
      {
        bot: {
          id: "im-a-bot",
          username: "im-a-bot",
          politicalRanking: 0,
        },
        adId: "a6581eda-b9ab-49b7-b66c-7a21ce3211fd",
        adSeenId: "2",
        botId: "im-a-bot",
        createdAt: "2021-08-26 01:10:25.532214",
      },
    ],
  },
  
  mockBotData: [{
    id: "f7bd2258-a38e-4388-b05e-27c6c89956f6",
    username: "damiandarsey",
    dob: "1985-04-20T14:00:00.000Z",
    gender: "Male",
    fName: "Damian",
    lName: "DArcey",
    otherTermsCategory: 5,
    password: "k3sDApFb6gKFsGK",
    locLat: 33.4484,
    locLong: -112.074,
    type: "google",
    politicalRanking: 4,
  },
  {
    id: "f7bd2258-a38e-4388-b05e-27c6c899523d",
    username: "awhite2627",
    dob: "1985-05-06T04:00:00.000Z",
    gender: "Female",
    fName: "Allison",
    lName: "White",
    otherTermsCategory: 2,
    password: "AHS528$%",
    locLat: 33.005,
    locLong: -844.074,
    type: "google",
    politicalRanking: 9,
  }
],

};

export default mockData;
