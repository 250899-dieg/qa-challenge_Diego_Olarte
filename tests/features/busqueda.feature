Feature: Search form

  Scenario: submitting navigates to results page
    Given I am on the search form
    When I submit a search from "BOG" to "JFK" departing "2026-02-15" returning "2026-02-20"
    Then I should be navigated to results for origin "BOG"
