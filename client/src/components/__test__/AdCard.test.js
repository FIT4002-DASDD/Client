import { render, screen, fireEvent, getByText } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import GoogleAdCard from "../google/GoogleAdCard";
import TwitterAdCard from "../twitter/TwitterAdCard";
import moment from "moment";
import politicalRanking from "../../helpers/politicalRankings";
import mockData from "../testMockData/mockData";
import Geocode from "react-geocode";
import { act } from "react-dom/test-utils";
import { extractDomain } from "../../helpers/processLink";

let checkDate = moment(mockData.mockGoogleAdWithImg.createdAt).format(
  "YYYY-MMM-D h:mma"
);

test("Renders in DOM without errors", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdWithImg}
        allTags={mockData.mockGoogleTags}
      />,
      div
    );
  });
});

test("Ad card with Ad link available", () => {
  act(() => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdWithImg}
        allTags={mockData.mockGoogleTags}
      />
    );
  });
  const buttonText = screen.getByText(/visit ad link/i);
  expect(buttonText).toBeInTheDocument();
});

test("Ad card with no Ad link available", () => {
  act(() => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdNoImg}
        allTags={mockData.mockGoogleTags}
      />
    );
  });
  const noLinkText = screen.getByText(/No Link Available/i);
  expect(noLinkText).toBeInTheDocument();
});

test("Ad card date", () => {
  act(() => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdWithImg}
        allTags={mockData.mockGoogleTags}
      />
    );
  });
  const date = screen.getByText(checkDate);
  expect(date).toBeInTheDocument();
});

test("CLI-5: Google ad card seen bot", () => {
  act(() => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdWithImg}
        allTags={mockData.mockGoogleTags}
      />
    );
  });
  const botName = screen.getByText(mockData.mockGoogleAdWithImg.bot.username);
  expect(botName).toBeInTheDocument();
});

test("Ad card with seen on", () => {
  act(() => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdWithImg}
        allTags={mockData.mockGoogleTags}
      />
    );
  });
  const seenOnButtonText = screen.getByText(
    extractDomain(mockData.mockGoogleAdWithImg.seenOn)
  );
  expect(seenOnButtonText).toBeInTheDocument();
});

test("Ad card without seen on", () => {
  act(() => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdNoSeenOn}
        allTags={mockData.mockGoogleTags}
      />
    );
  });
  const seenOnButtonText = screen.getByText(/Unavailable/i);
  expect(seenOnButtonText).toBeInTheDocument();
});

if (mockData.mockGoogleTags.length) {
  test("Ad card Click on existing tag", async () => {
    render(
      <GoogleAdCard
        ad={mockData.mockGoogleAdWithImg}
        allTags={mockData.mockGoogleTags}
      />
    );
    const tags = screen.getAllByRole("tag");
    expect(tags).toHaveLength(mockData.mockGoogleTags.length);
  });
}

test("CLI-9: Google Ad card with Ad image", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const adScreenshotAlt = screen.getByAltText(/Ad screenshot/i);
  expect(adScreenshotAlt).toBeInTheDocument();
});

test("Ad card with no Ad image", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdNoImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const noImgText = screen.getByText(/No screenshot scraped/i);
  expect(noImgText).toBeInTheDocument();
});

test("CLI-11: Google Ad card image click", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(screen.getByAltText(/Ad screenshot/i));
  const adScreenshotFullAlt = await screen.findByAltText(/Ad screenshot full/i);
  expect(adScreenshotFullAlt).toBeInTheDocument();
});

test("Ad card seen bot button click", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(
    await screen.findByText(mockData.mockGoogleAdWithImg.bot.username)
  );
  const botDetailsName = await screen.findByText(
    mockData.mockGoogleAdWithImg.bot.fName +
      " " +
      mockData.mockGoogleAdWithImg.bot.lName
  );

  expect(botDetailsName).toBeInTheDocument();
});

test("Political Inclination in bot details", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(
    await screen.findByText(mockData.mockGoogleAdWithImg.bot.username)
  );
  const ranking =
    politicalRanking[`${mockData.mockGoogleAdWithImg.bot.politicalRanking}`];
  const botInclination = await screen.findByText(ranking);
  expect(botInclination).toBeInTheDocument();
});

test("Political terms & other terms button in bot details", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(
    await screen.findByText(mockData.mockGoogleAdWithImg.bot.username)
  );
  const viewTermsButtons = await screen.findAllByText(/VIEW/i);

  expect(viewTermsButtons).toHaveLength(2);
});

test("Gender in bot details", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(
    await screen.findByText(mockData.mockGoogleAdWithImg.bot.username)
  );
  const botGender = await screen.findByText(
    mockData.mockGoogleAdWithImg.bot.gender
  );
  expect(botGender).toBeInTheDocument();
});

test("Age in bot details", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(
    await screen.findByText(mockData.mockGoogleAdWithImg.bot.username)
  );

  const botAge = await screen.findByText(
    moment().diff(mockData.mockGoogleAdWithImg.bot.dob, "years")
  );
  expect(botAge).toBeInTheDocument();
});

test("CLI-19: Render Twitter Ad card", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />,
    div
  );
});

test("CLI-20: Twitter Ad card with Ad link available", () => {
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  const button = screen.getByRole("link", { name: /ad link/i });
  expect(button).toBeInTheDocument();
});

test("CLI-21: Twitter Ad card with Tweet link available", () => {
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  const button = screen.getByRole("link", { name: /tweet link/i });
  expect(button).toBeInTheDocument();
});

test("CLI-22: Twitter Ad seen count", () => {
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  expect(
    screen.getByText("Seen count", { exact: false }).parentElement
  ).toHaveTextContent(mockData.mockTwitterAd.seenInstances.length.toString());
});

test("CLI-23: Twitter AdCard seen bots", () => {
  const botNames = [
    ...new Set(
      mockData.mockTwitterAd.seenInstances.map((item) => item.bot.username)
    ),
  ];
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  botNames.forEach((b) => {
    const button = screen.getByRole("button", { name: b });
    expect(button).toBeInTheDocument();
  });
});

test("CLI-24: Twitter Ad Card promoter handle", () => {
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  const handle =
    screen.getByText(/Promoter handle:/i).parentElement.nextElementSibling;
  expect(handle).toHaveTextContent(
    new RegExp(mockData.mockTwitterAd.promoterHandle + "$")
  );
});

if (mockData.mockTwitterTags.length) {
  test("CLI-25: Twitter Ad card existing tags", async () => {
    render(
      <TwitterAdCard
        ad={mockData.mockTwitterAd}
        allTags={mockData.mockTwitterTags}
      />
    );
    const tags = screen.getAllByRole("tag");
    expect(tags).toHaveLength(mockData.mockTwitterTags.length);
  });
}

test("CLI-26: Twitter Ad card with Ad image", () => {
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  const adScreenshotAlt = screen.getByAltText(/Ad screenshot/i);
  expect(adScreenshotAlt).toBeInTheDocument();
});

test("CLI-27: Twitter Ad card image click", async () => {
  render(
    <TwitterAdCard
      ad={mockData.mockTwitterAd}
      allTags={mockData.mockTwitterTags}
    />
  );
  fireEvent.click(screen.getByAltText(/Ad screenshot/i));
  const adScreenshotFullAlt = await screen.findByAltText(/Ad screenshot full/i);
  expect(adScreenshotFullAlt).toBeInTheDocument();
});

test("CLI-28: Twitter Ad card click seen bot", () => {
  act(() => {
    render(
      <TwitterAdCard
        ad={mockData.mockTwitterAd}
        allTags={mockData.mockTwitterTags}
      />
    );
  });
  const botName = screen.getByText(
    mockData.mockTwitterAd.seenInstances[0].bot.username
  );
  expect(botName).toBeInTheDocument();
  fireEvent.click(botName);
  const botDetails = screen.getByTestId("twitter-bot-details");
  expect(botDetails).toBeInTheDocument();
});

test("CLI-29: Twitter Political Inclination in bot details", () => {
  act(() => {
    render(
      <TwitterAdCard
        ad={mockData.mockTwitterAd}
        allTags={mockData.mockTwitterTags}
      />
    );
  });
  const botName = screen.getByText(
    mockData.mockTwitterAd.seenInstances[0].bot.username
  );
  expect(botName).toBeInTheDocument();
  fireEvent.click(botName);
  const botDetails = screen.getByTestId("twitter-bot-details");
  expect(botDetails).toBeInTheDocument();
  screen.getByText(/Political Alignment:/i);
  screen.getByText(/Right/i); // with bot politicalRanking=4
});

test("CLI-30: Twitter Seen count & seen dates in bot details", () => {
  act(() => {
    render(
      <TwitterAdCard
        ad={mockData.mockTwitterAd}
        allTags={mockData.mockTwitterTags}
      />
    );
  });
  const botNameString = mockData.mockTwitterAd.seenInstances[0].bot.username;
  const seenInstances = mockData.mockTwitterAd.seenInstances.filter(
    (e) => e.bot.username === botNameString
  );
  const botName = screen.getByText(botNameString);
  expect(botName).toBeInTheDocument();
  fireEvent.click(botName);
  const botDetails = screen.getByTestId("twitter-bot-details");
  expect(botDetails).toBeInTheDocument();

  // Check that the ad seen count displayed is correct
  screen.getByText(
    new RegExp(
      `Seen this ad ${seenInstances.length} time${
        seenInstances.length > 1 ? "s" : ""
      }, at:`,
      "i"
    )
  );

  const times = seenInstances.map((e) =>
    moment(e.createdAt).format("YYYY-MMM-D h:mm:ssa")
  );

  // Check that times when the ad was seen are displayed
  times.forEach((time) => {
    screen.getByText(new RegExp(time, "i"));
  });
});
