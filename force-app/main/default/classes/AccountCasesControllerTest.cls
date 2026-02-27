@isTest
private class AccountCasesControllerTest {

    @isTest
    static void testSearchWithResults() {
        Account acc = new Account(Name = 'Test');
        insert acc;
        Case matchingCase = new Case(
            AccountId = acc.Id,
            Subject   = 'Problème de connexion',
            Status    = 'New',
            Priority  = 'Medium'
        );
        Case otherCase = new Case(
            AccountId = acc.Id,
            Subject   = 'Facturation',
            Status    = 'New',
            Priority  = 'Low'
        );
        insert new List<Case>{ matchingCase, otherCase };

        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject(acc.Id, 'connexion');
        Test.stopTest();

        System.assertEquals(1, results.size(), 'On doit récupérer exactement 1 case');
        System.assertEquals(matchingCase.Id, results[0].Id, 'Le case retourné doit être celui qui contient "connexion"');
    }

    @isTest
    static void testSearchNoResults() {
        // Arrange
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        // Create a case that should not match the searched subject
        Case unrelated = new Case(
            AccountId = acc.Id,
            Subject   = 'Support général',
            Status    = 'New',
            Priority  = 'Low'
        );
        insert unrelated;

        // Act
        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject(acc.Id, 'inexistant');
        Test.stopTest();

        // Assert
        System.assertEquals(0, results.size(), 'Aucun case ne doit être retourné pour un sujet inexistant');
    }
}
