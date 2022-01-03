import { LightningElement, track } from 'lwc';
import GetProductList from '@salesforce/apex/WebController.GetProductList';

export default class Getproducts extends LightningElement {

    @track
    myCourses = [];

    @track
    mySearchedCourses = [];

    connectedCallback()
     {
       //Get Product list to display
        GetProductList()
          .then((result) => {
            this.myCourses = result;
          })
          .catch((error) => {
            console.log(error);
            this.myCourses = [];
          });
     }

     //Custom event handler for course search result display
     handleCourseResult(event)
     {
        console.log('Inside handleCourseResult');
        //this.mySearchedCourses = [];
        this.mySearchedCourses = event.detail;
     }

}