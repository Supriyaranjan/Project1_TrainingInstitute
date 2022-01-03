import { LightningElement, track } from 'lwc';
import GetProductByName from '@salesforce/apex/WebController.GetProductByName';

export default class Searchcourse extends LightningElement {

    @track
    mySearchedCourses;

    @track
    courseText;

    courseTextChange(event)
    {
        this.courseText = event.target.value;
    }

    //get courselist for the entered text
    getProductsByName()
    {
        this.mySearchedCourses = [];
        GetProductByName({productName: this.courseText})
        .then((result) => {
            this.mySearchedCourses = result;
            //dispatch a custom event after course result search
            this.dispatchEvent(new CustomEvent('courseresult', { detail: this.mySearchedCourses }));
        })
        .catch((error) => {
            console.log(error);
            this.mySearchedCourses = [];
            this.dispatchEvent('courseresult', { detail: this.mySearchedCourses })
        });
    }
}