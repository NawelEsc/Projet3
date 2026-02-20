import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    @track opportunities = [];
    @track error;
    wiredResult;

    columns = [
        { label: 'Nom', fieldName: 'Name', type: 'text' },
        { label: 'Montant', fieldName: 'Amount', type: 'currency' },
        { label: 'Clôture', fieldName: 'CloseDate', type: 'date' },
        { label: 'Phase', fieldName: 'StageName', type: 'text' },
        { 
            type: 'action', 
            typeAttributes: { 
                rowActions: [
                    { label: 'Voir', name: 'view' },
                    { label: 'Editer', name: 'edit' }
                ] 
            } 
        }
    ];

    @wire(getOpportunities, { recordId: '$recordId' })
    wiredOpportunities(result) {
        this.wiredResult = result;
        const { error, data } = result;
        console.log('🔍 DATA:', data?.length || 0);
        if (data && data.length >0) {
            this.opportunities = data;
            this.error = undefined;
        } else {
            this.error ='Erreur chargement';
            this.opportunities = [];
        }
    }

    handleRowAction(event) {
        const rowId = event.detail.row.Id;
        const actionName = event.detail.action.name;
        if (actionName === 'view') {
            window.open(`/lightning/r/Opportunity/${rowId}/view`, '_blank');
        } else if (actionName === 'edit') {
            window.open(`/lightning/r/Opportunity/${rowId}/edit`, '_blank');
        }
    }

    //  BUG 4 FIXÉ - ÉTAPE 3
    handleRafraichir() {
        console.log('🔄 Rafraîchir START - wiredResult:', !!this.wiredResult);
        
      
        
        refreshApex(this.wiredResult);
           

    }
}


