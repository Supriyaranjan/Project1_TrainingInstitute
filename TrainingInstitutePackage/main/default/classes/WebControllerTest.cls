@isTest
public with sharing class WebControllerTest {
    public WebControllerTest() {

    }
    @isTest
    public static void testGetAccounts()
    {
        //Test for GetAccountList method
        Test.startTest();
        List<Account> actLst = new List<Account>();
        for(Integer num = 0; num < 4; num++) {
            Account actRec = new Account();
            actRec.Name = 'Test Account ' + num;
            actRec.Description = 'This is test account ' + num;
            actRec.Total_Order__c = 100;
            actLst.add(actRec);
        }

        try{
            insert actLst;
            List<Account> insertedAct = WebController.GetAccountList();
            System.assertEquals(4, insertedAct.size());
        }
        catch(Exception exp){
            System.assert(false);
        }
        Test.stopTest();
    }

    @isTest
    public static void testGetProducts()
    {
        //Test for GetProductList method
        Test.startTest();

        List<Product2> prdLst = new List<Product2>();
        for(Integer num = 0; num < 4; num++) {
            Product2 prdRec = new Product2();
            prdRec.Name = 'Test Product ' + num;
            prdRec.Description = 'This is test product  ' + num;
            prdRec.Family = 'Full Stack Development';
            prdLst.add(prdRec);
        }

        try{
            insert prdLst;
            List<Product2> insertedPrd = WebController.GetProductList();
            System.assertEquals(4, insertedPrd.size());
        }
        catch(Exception exp){
            System.assert(false);
        }
        Test.stopTest();
    }

    @isTest
    public static void testProductByName()
    {
        //Test for GetProductByName method
        Test.startTest();

        List<Product2> prdLst = new List<Product2>();
        for(Integer num = 0; num < 4; num++) {
            Product2 prdRec = new Product2();
            prdRec.Name = 'Test Product ' + num;
            prdRec.Description = 'This is test product  ' + num;
            prdRec.Family = 'Full Stack Development';
            prdLst.add(prdRec);
        }

        try{
            insert prdLst;
            List<Product2> insertedPrd = WebController.GetProductByName('Test Product 1');
            System.assertEquals(1, insertedPrd.size());

            insertedPrd = WebController.GetProductByName('Test Product');
            System.assertEquals(4, insertedPrd.size());
        }
        catch(Exception exp){
            System.assert(false);
        }

        Test.stopTest();
    }

    @isTest
    public static void testGetTrainerDetail()
    {
        //Test for GetTrainerDetails()
        Test.startTest();

        Product2 prdRec = new Product2();
        prdRec.Name = 'Test Product';
        prdRec.Description = 'This is test product ';
        prdRec.Family = 'Full Stack Development';

        try{
            insert prdRec;
            Id prodId = prdRec.Id;
            Trainer__c trainerDetail = new Trainer__c();
            trainerDetail.Name = 'Test Trainer';
            trainerDetail.Product__c = prodId;

            insert trainerDetail;

            Trainer__c insertedTrainerDetail = WebController.GetTrainerDetails((String)prodId);
            
            System.assertEquals('Test Trainer', insertedTrainerDetail.Name);

            try{
                //This is the failure scenario since prodId is not correct so it will raise an exception
                insertedTrainerDetail = WebController.GetTrainerDetails('test');
                System.assert(false);
            }
            catch(Exception e){
                System.assert(true);
            }
        }
        catch(Exception exp){
            System.assert(false);
        }

        Test.stopTest();
    }

    @isTest
    public static void testGetProductPrice()
    {
        //Testing failure scenario for GetPriceForProduct()
        Test.startTest();
        try{
            PricebookEntry prcEntry = WebController.GetPriceForProduct('test');
        }
        catch(Exception e)
        {
            System.assert(true);
        }

        Test.stopTest();
    }
}
