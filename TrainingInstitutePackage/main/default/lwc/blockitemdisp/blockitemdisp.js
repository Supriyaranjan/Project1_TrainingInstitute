import { LightningElement, api } from 'lwc';

export default class Blockitemdisp extends LightningElement {

    @api
    itemId;

    @api
    itemName;

    @api
    itemProperty;

    @api
    itemDescription;

    @api
    title;

}