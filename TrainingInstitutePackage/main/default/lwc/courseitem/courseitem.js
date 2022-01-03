import { LightningElement, api, track } from 'lwc';
import GetPriceForProduct from '@salesforce/apex/WebController.GetPriceForProduct';
import GetTrainerDetails from '@salesforce/apex/WebController.GetTrainerDetails'

export default class Courseitem extends LightningElement {

    @api
    itemId;

    @api
    itemName;

    @api
    itemFamily;

    @api
    itemDescription;

    @track
    itemPrice = 0;

    @track
    itemPriceDetails;

    @track
    iconName;

    @track myTrainer;

    @track trainerName;

    showDetails = false;

    connectedCallback()
    {
        this.iconName = "utility:chevrondown";
        let prodId = this.itemId;
        //Get trainer details for the course
        GetTrainerDetails({productId: prodId})
        .then((result) => {
            this.myTrainer = result;
            this.trainerName = this.myTrainer.Name;
        })
        .catch((error) => {
            console.log(error);
            this.myTrainer = [];
            this.trainerName = ""; 
            });
    }

    handleShowDetails()
    {
        if(this.showDetails === false)
        {  
            let prodId = this.itemId;
            this.showDetails = true;
            this.iconName = "utility:chevronup";
            if(this.itemPrice <= 0)
            {
                //Fetch course price to display in details section
                GetPriceForProduct({productId: prodId})
                .then((result) => {
                    this.itemPriceDetails = result;
                    this.itemPrice = this.itemPriceDetails.UnitPrice;
                })
                .catch((error) => {
                    console.log(error);
                    this.itemPriceDetails = [];
                    this.itemPrice = 0;
                });
            }
        }
        else
        {
            this.showDetails = false;
            this.iconName = "utility:chevrondown";
            //this.detailToggleIcon = "resources/chevrondown_60.png";
            //this.detailToggleText = "Details";
        }
    }
}