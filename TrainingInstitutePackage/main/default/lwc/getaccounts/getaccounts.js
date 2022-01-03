import { LightningElement, track } from 'lwc';
import GetAccountList from "@salesforce/apex/WebController.GetAccountList"

export default class Getaccounts extends LightningElement {

    @track
    myAccounts = [];

    connectedCallback()
     {
       //get the account list using Apex call
        GetAccountList()
          .then((result) => {
            this.myAccounts = result;
          })
          .catch((error) => {
            console.log(error);
            this.myAccounts = [];
          });
     }
}