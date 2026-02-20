/**
 * @description Exposes Account-related Opportunities to Lightning (LWC/Aura).
 *              Cacheable read endpoint for UI usage.
 * @group Controllers
 */
public with sharing class AccountOpportunitiesController {

    /**
     * @description Returns recent Opportunities for a given Account, ordered by CloseDate desc.
     * @param recordId The Account Id to filter Opportunities by.
     * @return List of Opportunity records.
     */
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(Id recordId) {
        if (recordId == null) {
            return new List<Opportunity>();
        }
        return [
            SELECT Id, Name, Amount, StageName, CloseDate
            FROM Opportunity
            WHERE AccountId = :recordId
            ORDER BY CloseDate DESC
        ];
    }
}
