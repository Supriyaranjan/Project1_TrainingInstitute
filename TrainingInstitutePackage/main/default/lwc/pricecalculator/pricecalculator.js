import { LightningElement, track } from 'lwc';

export default class Pricecalculator extends LightningElement {

    @track
    mySearchedCourses = [];

    @track
    myCoursesCart = [];

    @track
    totalCartPrice = 0;

    //custom handler for the course result 
    handleCourseResult(event)
     {
         console.log('Inside handleCourseResult of price calculator');
         this.mySearchedCourses = event.detail;
     }

     //handler to add selected courses to the cart
     addToCart(event)
     {
         console.log("I am here 2");
         let itemIndex = event.target.dataset.index;
         console.log("Shop Item index clicked: " + itemIndex);
         let itemDetails = event.detail;
         console.log("Item details: " + itemDetails.name);
         let itemExist = false;

        if (this.myCoursesCart.length > 0)
        {
            this.myCoursesCart.forEach(element => {
                 if(element.itemid === itemDetails.itemid)
                 {
                     element.quantity = Number(element.quantity) + Number(itemDetails.quantity);
                     itemExist = true;
                 }
            });
        }
        if(itemExist === false)
        {
            this.myCoursesCart.push(itemDetails);
        }
         
        this.updateCartTotalPrice(this.myCoursesCart);
     }

     //function to update cart total price
    updateCartTotalPrice(cartItems)
    {
          this.totalCartPrice = 0;
          cartItems.forEach(element => {
              this.totalCartPrice = this.totalCartPrice + element.price * element.quantity;
          });
    }

    //function to handle item deletion from cart
    handleCartItemDelete(event)
    {
        let selectedItemId = event.detail;
        if (this.myCoursesCart.length > 0)
        {
            this.myCoursesCart = this.myCoursesCart.filter( obj =>
                          obj.itemid !== selectedItemId);

            //update cart total price after deletion
            this.updateCartTotalPrice(this.myCoursesCart);
        }
    }
}