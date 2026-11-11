@API 
Feature: ParaBank Customer Registration API
  //npx cypress run --spec "cypress/e2e/features/register.feature"
  //npx cypress run --spec "cypress/e2e/features/register.feature" --env tags="@API"
  @Registration
  Scenario: Register a new customer through API
    Given I establish a session with ParaBank registration page
    When I generate a dynamic username
    And I send a POST request with the following customer details
      | firstName | Jhon       |
      | lastName  | Smith      |
      | street    | ABC Street |
      | city      | Mumbai     |
      | state     | MH         |
      | zipCode   | 400001     |
      | phone     | 1234567890 |
      | ssn       | 123456789  |
      | password  | Test@123   |
    Then the registration response status should be 200

  Scenario Outline: Login with different credentials
    Given the user is on the login page
    When the user enters username "<username>" and password "<password>" and send the request
    Then the login response status should be <result>
    Examples:
      | username | password | result  |
      | test     | test123  | 200     |
      | json     | json     | 200     |
   @Login
  Scenario: Login with valid credentials
    Given the user is on the login page
    When the user enters username "json" and password "json" and send the request
    Then the login response status should be 200
    When the user fetches the accounts overview'
    Then the accounts response should be valid  


   