import { LightningElement, api } from 'lwc';

import LEAD_LASTNAME from '@salesforce/schema/Lead.LastName'
import LEAD_FIRSTNAME from '@salesforce/schema/Lead.FirstName'
import LEAD_COMPANY from '@salesforce/schema/Lead.Company'
import LEAD_EMAIL from '@salesforce/schema/Lead.Email'
import LEAD_CITY from '@salesforce/schema/Lead.City'
import LEAD_STATE from '@salesforce/schema/Lead.State'
import LEAD_PHONE from '@salesforce/schema/Lead.Phone'
import LEAD_SOURCE from '@salesforce/schema/Lead.LeadSource'

export default class Webtoleadwebform extends LightningElement {

    @api
    leadLastName = LEAD_LASTNAME;

    @api
    leadFirstName = LEAD_FIRSTNAME;

    @api
    leadEmail = LEAD_EMAIL;

    @api
    leadPhone = LEAD_PHONE;

    @api
    leadCompany = LEAD_COMPANY;

    @api
    leadCity = LEAD_CITY;

    @api
    leadState = LEAD_STATE;

    @api
    leadSource = LEAD_SOURCE;

    displayForm = true;

    displayResponseMessage = "";

    leadId;

    handleSuccess(event){
        this.displayForm = false;
        this.leadId = event.detail.id;
        console.log(event.detail);
        this.displayResponseMessage = "Thanks for contacting us. We will get back to you shortly";

    }

    handleError(){
        this.template.querySelector('[data-id="formerror"]').setError('Fail to create Lead');
    }
}