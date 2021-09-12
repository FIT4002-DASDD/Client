# Testing

## Running Test Suites

cd into the client folder and run `yarn test` in the terminal

## Tools

Test runner: jest

Testing Library: React Testing Library (RTL)

## Test files structure

When setting up tests for a component a new file should be created with the exact name of the component being tested (not required but recommended) followed by `.test.js`. This file should be placed in a folder called `__test__ `, which is located in the directory that the component resides in.

_Note_ :
Jest runs all files that are located in `__test__ ` folders that end with `.js`

## RTL Test Structure

![alt text](./RTL%20structure.png)

## Test implementation steps

Step 1

The first step of the unit test is to render a component. If the component requires the react-router to function the wrapper option can be passed into the render function. If the component requires access to the history object BrowserRouter should be used as the wrapper. If not, MemoryRouter can be used (underlined in green in the example).

For more info refer to : https://testing-library.com/docs/example-react-router

Step 2

The second step is to target the element that needs to be tested. This can be done by using RTL queries.

A detailed list of queries and when to use them can be found at : https://testing-library.com/docs/queries/about/#!

For any given element there is more than one RTL query to target it. To determine which query to use it is recommended to mimic user interaction as much as possible. This can be done by following the priority chart given below.
![alt text](./query%20priority.png)

Step 3

If an interaction with the targeted element is required this is done by using RTL user actions

A detailed list of user actions can be found at : https://testing-library.com/docs/dom-testing-library/api-events

Step 4

Finally we make an assertion that the results of the test are as expected. This is done by using functions from the jest-dom library.

A full list of custom matchers for assertion can be found here: https://github.com/testing-library/jest-dom#custom-matchers
