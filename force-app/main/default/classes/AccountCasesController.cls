public with sharing class AccountCasesController {

    @AuraEnabled(cacheable=true)
    public static List<Case> findCasesBySubject(Id accountId, String subjectSearchTerm) {
        // Documentation :
        // Recherche les Cases liés à un compte dont le Subject contient le texte fourni.
        // Renvoie une liste vide si le texte est vide.

        if (accountId == null || String.isBlank(subjectSearchTerm)) {
            return new List<Case>();
        }

        String likePattern = '%' + String.escapeSingleQuotes(subjectSearchTerm) + '%';

        return [
            SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate, AccountId
            FROM Case
            WHERE AccountId = :accountId
            AND Subject LIKE :likePattern
            ORDER BY CreatedDate DESC
            LIMIT 100
        ];
    }
}
