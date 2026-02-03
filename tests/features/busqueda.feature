Feature: Search and results

  Background:
    Given I am on the search form

  @smoke
  Scenario: homepage renders hero content
    Then I should see the hero heading

  @results
  Scenario: results page shows branding and route summary
    When I open results for origin "BOG" destination "MEX" departing "2026-02-15" returning ""
    Then I should see results header for origin "BOG" and destination "MEX"
    And I should see the results list

  @defect
  Scenario: return date earlier than departure is allowed (intentional defect)
    When I submit a search from "BOG" to "MEX" departing "2026-02-20" returning "2026-02-15"
    Then the results page should still load for origin "BOG" and destination "MEX"

  @mobile
  Scenario: mobile overlay is visible on small screens (intentional defect)
    When I view results on a small screen for origin "BOG" destination "GRU" departing "2026-02-25"
    Then the booking overlay should be visible
