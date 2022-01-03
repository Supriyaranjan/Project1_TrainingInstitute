@isTest
public with sharing class OrderHandlerTest {
    public OrderHandlerTest() {
          
    }

    @isTest
    public static void checkAcctOrdAmountUpdate(){

        Test.startTest();

        try{
            //Create an account
            Account actRec = new Account();
            actRec.Name = 'Test Account 1';
            actRec.Description = 'This is test account 1';
            actRec.Total_Order__c = 100;
            insert actRec;
            Id actId = actRec.Id;
            //Put a fake value for Total_Order__c for Account before Order Trigger
            System.assertEquals(100, actRec.Total_Order__c);
            
            //Create a trainer
            Trainer__c trainerDetail = new Trainer__c();
            trainerDetail.Name = 'Test Trainer';

            insert trainerDetail;

            Id trnId = trainerDetail.Id;
              
            //Create a contract
            Contract ctr = new Contract();
            ctr.AccountId = actId;
            ctr.Status = 'Draft';
            ctr.StartDate = System.today();
            ctr.ContractTerm = 6;

            insert ctr;

            Id ctrId = ctr.Id;
              
            //Create an Order record
            Order ordDetail = new Order();

            ordDetail.AccountId = actId;
            ordDetail.EffectiveDate = System.today();
            ordDetail.Trainer__c = trnId;
            ordDetail.Status = 'Draft';
            ordDetail.ContractId = ctrId;
            //This will invoke the trigger for Order insert
            insert ordDetail;

            System.assert(true);
            //Check for the updated Total_Order__c value of the Account after Order trigger
            Account updatedAct = [select Id, name, Total_Order__c from Account WHERE Id = :actId  LIMIT 1];

            System.assertEquals(0, updatedAct.Total_Order__c);
        }
        catch(Exception e)
        {
            System.assert(false);
        }

        Test.stopTest();

    }
}
