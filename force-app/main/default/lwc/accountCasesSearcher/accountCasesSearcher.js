import { LightningElement, track, api } from 'lwc';
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

const COLUMNS = [
    { label: 'Sujet', fieldName: 'Subject', type: 'text' },
    { label: 'Statut', fieldName: 'Status', type: 'text' },
    { label: 'Priorité', fieldName: 'Priority', type: 'text' },
];

export default class AccountCaseSearchComponent extends LightningElement {
    @api recordId;
    @track cases = [];
    error = null;
    searchTerm = '';
    noResults = false;
    columns = COLUMNS;

    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        // Validation champ vide (bug 10)
        if (!this.searchTerm || this.searchTerm.trim() === '') {
            this.error = 'Veuillez saisir un sujet avant de lancer la recherche.';
            this.cases = [];
            this.noResults = false;
            return;
        }

        findCasesBySubject({
            accountId: this.recordId,
            subjectSearchTerm: this.searchTerm
        })
            .then(result => {
                this.cases = result;
                this.error = null;
                this.noResults = (result.length === 0);
            })
            .catch(error => {
                this.error = error;
                this.cases = [];
                this.noResults = false;
            });
    }
}

