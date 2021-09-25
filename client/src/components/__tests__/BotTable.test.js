import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import { GoogleAdCard, TwitterAdCard } from "../AdCard";
import BotsTable from "../BotsTable";
import moment from "moment";
import politicalRanking from "../../helpers/politicalRankings";
import mockData from "../testMockData/mockData";
import Geocode from "react-geocode";
import { act } from "react-dom/test-utils";



test("Bot username in Bots page", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const username = screen.getByText('damiandarsey');
    expect(username).toBeInTheDocument();
});

test("Bot name in Google Bots page", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const name = screen.getByText('Damian DArcey');
    expect(name).toBeInTheDocument();
});

test("Bot Dob in Google bots page", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const Dob = screen.getByText('21/04/1985');
    expect(Dob).toBeInTheDocument();
});

test("Bot password in Google Bots page", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const password = screen.getByText('k3sDApFb6gKFsGK');
    expect(password).toBeInTheDocument();
});

test("Bot type in Google Bots page", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const type = screen.getByText('google');
    expect(type).toBeInTheDocument();
});

test("All google bots shown in bots table", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const bot1 = screen.getByText('damiandarsey');
    expect(bot1).toBeInTheDocument();
    const bot2 = screen.getByText('awhite2627');
    expect(bot2).toBeInTheDocument();
});

test("Google Bot select", () => {
    act(() => {
        render(
        <BotsTable bots={mockData.mockBotData} source={"google"}/>,
        );
    });
    const checkbox = screen.getByRole('checkbox', { checked: true })
    fireEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
});