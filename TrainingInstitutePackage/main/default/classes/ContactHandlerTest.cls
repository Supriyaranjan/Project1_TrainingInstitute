@isTest
public with sharing class ContactHandlerTest {
       @isTest
        public static void checkExistingEmail() {
            Test.startTest();
            //Insert a contact record first
            Contact contact1 = new Contact();
        	contact1.LastName = 'Test1';
        	contact1.Email = 'abc@gmail.com';
        	insert contact1;
            
            //Create another contact with same email Id
            Contact ctToAdd = new Contact();   
            ctToAdd.LastName = 'ContactTest';
            	ctToAdd.Email = 'abc@gmail.com';
            try{
                //This should fail as email validation will occur because of contact trigger
            	insert ctToAdd;
            }
            catch(Exception error){
                System.Assert(true);
            }
            
            //Create another contact with a different email id
            Contact ctToAdd2 = new Contact();   
            ctToAdd.LastName = 'ContactTest';
            	ctToAdd.Email = 'abcd@gmail.com';
            try{
                //this insert should be successful as it is a differnt email id
            	insert ctToAdd;
                System.Assert(true);
            }
            catch(Exception error){
                System.Assert(false);
            }

            Test.stopTest();
        }

}
