import { LightningElement, api } from 'lwc';

export default class Cartitem extends LightningElement {

    @api
    itemId;

    @api
    itemName;

    @api
    itemQuantity;

    @api
    itemPrice;

    itemTotalPrice = 0;

    connectedCallback()
    {
        this.itemTotalPrice = Number(this.itemQuantity) * Number(this.itemPrice);
    }

    handleDeleteClick()
    {
        let itemClickedId = this.itemId;
        //dispatch a custom delete event when item is deleted from cart
        this.dispatchEvent(new CustomEvent('deleteitem', {detail: itemClickedId, bubbles: true }));
    }
}