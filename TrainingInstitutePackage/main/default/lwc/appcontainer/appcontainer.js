import { LightningElement, track } from 'lwc';
import TRAININGIMAGE from '@salesforce/resourceUrl/traininginstitutebackground'

export default class Appcontainer extends LightningElement {

    trainingimg = TRAININGIMAGE; 

    @track
    displayHome = true;

    @track
    displayCourse = false;

    @track
    displayPriceCalculator = false;

    @track
    displayConnectPage = false;

    connectedCallback()
    {
        //enable home view when page is loaded
        this.handleHomeClicked();
    }

    //function to disable all views
    disableAllViews()
    {
        this.displayHome = false;
        this.displayCourse = false;
        this.displayPriceCalculator = false;
        this.displayConnectPage = false;
    }

    //function to enable home view
    handleHomeClicked()
    {
        this.disableAllViews();
        this.displayHome = true;
    }

    //function to enable Course view
    handleCourseClicked()
    {
        this.disableAllViews();
        this.displayCourse = true;
    }

    //function to enable Price Calculation view
    handlePriceCalculator()
    {
        this.disableAllViews();
        this.displayPriceCalculator = true;
    }

    //function to enable Connect With Us view
    handleConnect()
    {
        this.disableAllViews();
        this.displayConnectPage = true;
    }
}