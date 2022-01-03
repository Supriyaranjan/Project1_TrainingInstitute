import { LightningElement, api, track } from 'lwc';
import GetPriceForProduct from '@salesforce/apex/WebController.GetPriceForProduct';

export default class Shopitem extends LightningElement {

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
    itemQuantity;

    @track
    displayFooter = false;

    connectedCallback()
    {
        let prodId = this.itemId;
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

    getQuantity(event)
    {
        this.itemQuantity = event.target.value;
    }

    handleAddClick()
    {
        console.log("this is handleAddClick");
        this.displayFooter = true;
         let itemDetail = {itemid: this.itemId, name: this.itemName, price: this.itemPrice, quantity: this.itemQuantity};
         //dispatch custom event with the item details when add is clicked
         this.dispatchEvent(new CustomEvent('addclicked', { detail: itemDetail, bubbles: true }));
    }
}