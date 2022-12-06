import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import MyContributionsPage, { GET_MY_CONTRIBUTIONS_QUERY } from ".";
import { LOCAL_STORAGE_HASURA_TOKEN_KEY } from "src/hooks/useAuth";
import { RoutePaths } from "src/App";
import { MemoryRouterProviderFactory } from "src/test/utils";
import { PaymentStatus } from "src/types";

expect.extend(matchers);

const userId = "33f15d41-5383-4a73-b96b-347ece03513a";

const HASURA_TOKEN_BASIC_TEST_VALUE = {
  user: {
    id: userId,
  },
  accessToken: "SOME_TOKEN",
};

const mockContribution = {
  id: "705e6b37-d0ee-4e87-b681-7009dd691965",
  payments: [
    {
      amount: 100,
      currency_code: "USD",
    },
    {
      amount: 100,
      currency_code: "USD",
    },
  ],
  amount_in_usd: 200,
  budget: {
    project: {
      id: "632d5da7-e590-4815-85ea-82a5585e6049",
      name: "MyAwesomeProject",
      project_details: {
        description: "SOOOOOO awesome",
      },
    },
  },
};

const buildMockMyContributionsQuery = (
  userId: string,
  paymentRequests: Record<string, unknown>[] = [mockContribution]
) => ({
  request: {
    query: GET_MY_CONTRIBUTIONS_QUERY,
    variables: {
      userId,
    },
  },
  result: {
    data: {
      payment_requests: paymentRequests,
    },
  },
});

describe('"MyContributions" page', () => {
  beforeAll(() => {
    window.localStorage.setItem(LOCAL_STORAGE_HASURA_TOKEN_KEY, JSON.stringify(HASURA_TOKEN_BASIC_TEST_VALUE));
  });

  it("should print message when no contributions returned", async () => {
    render(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(userId, [])],
      }),
    });

    expect(await screen.findByText("No contributions yet")).toBeInTheDocument();
  });

  it("should render contributions table", async () => {
    render(<MyContributionsPage />, {
      wrapper: MemoryRouterProviderFactory({
        route: RoutePaths.Profile,
        mocks: [buildMockMyContributionsQuery(userId)],
      }),
    });

    expect(await screen.findByText(mockContribution.budget.project.project_details.description)).toBeInTheDocument();
    expect(await screen.findByText(mockContribution.budget.project.name)).toBeInTheDocument();
    expect(await screen.findByText("200 USD")).toBeInTheDocument();
    expect(await screen.findByText("Completed")).toBeInTheDocument();
  });
});
