import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import { GoogleAdCard } from "../AdCard";
import moment from "moment";
import politicalRanking from "../../helpers/politicalRankings";
import mockData from "../testMockData/mockData";
import Geocode from "react-geocode";

let checkDate = moment(mockData.mockGoogleAdWithImg.createdAt).format(
  "YYYY-MMM-D dddd h:mma"
);

const processLink = (link) => {
  if (link) {
    let link_split = link.split("/");
    let domain = link_split[2];
    if (domain) {
      let prefix = domain.split(".");
      if (prefix[0].toLowerCase() === "www") {
        prefix.shift();
      }
      domain = prefix.join(".");
    }

    return domain;
  }
};

test("Renders in DOM without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />,
    div
  );
});

test("Ad card with Ad link available", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const buttonText = screen.getByText(/visit ad link/i);
  expect(buttonText).toBeInTheDocument();
});

test("Ad card with no Ad link available", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdNoImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const noLinkText = screen.getByText(/No Link Available/i);
  expect(noLinkText).toBeInTheDocument();
});

test("Ad card date", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const date = screen.getByText(checkDate);
  expect(date).toBeInTheDocument();
});

test("Ad card seen bot", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const botName = screen.getByText(mockData.mockGoogleAdWithImg.bot.username);
  expect(botName).toBeInTheDocument();
});

test("Ad card with seen on", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  const seenOnButtonText = screen.getByText(
    processLink(mockData.mockGoogleAdWithImg.seenOn)
  );
  expect(seenOnButtonText).toBeInTheDocument();
});

test("Ad card without seen on", () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdNoSeenOn}
      allTags={mockData.mockGoogleTags}
    />
  );
  const seenOnButtonText = screen.getByText(/Not Applicable/i);
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

test("Ad card with Ad image", () => {
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

test("Ad card image click", async () => {
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

test("Location in bot details", async () => {
  render(
    <GoogleAdCard
      ad={mockData.mockGoogleAdWithImg}
      allTags={mockData.mockGoogleTags}
    />
  );
  fireEvent.click(
    await screen.findByText(mockData.mockGoogleAdWithImg.bot.username)
  );
  Geocode.setApiKey("AIzaSyBqDbAmGnJ7qOo-mNeidrZaqm_o0apJ0EA");
  let fullLoc = await Geocode.fromLatLng(
    mockData.mockGoogleAdWithImg.bot.locLat.toString(),
    mockData.mockGoogleAdWithImg.bot.locLong.toString()
  );
  let address = fullLoc.results[0].formatted_address;

  const botAdress = await screen.findByText(address);
  expect(botAdress).toBeInTheDocument();
});
