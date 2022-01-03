public with sharing class WebController {
    public WebController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> GetAccountList(){
    try {
        System.Debug('I am here Account');
        List<Account> accList =[select Id, name, description, Rating, Total_Order__c from Account WHERE Total_Order__c > 0 ORDER BY Total_Order__c DESC LIMIT 4];
        return accList;

        } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Product2> GetProductList(){
    try {
        System.Debug('I am here Product2');
        List<Product2> prdList =[select Id, name, description, Family from Product2 WHERE Family != '' LIMIT 4];
        return prdList;

        } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Product2> GetProductByName(String productName){
    try {
        System.Debug('I am here GetProductByName');
        String nameLike = '%'+ productName +'%';
        List<Product2> prdList =[select Id, name, description, Family from Product2 where name LIKE : nameLike AND Family != '' LIMIT 10];
        return prdList;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    
    }

    @AuraEnabled(cacheable=true)
    public static PriceBookEntry GetPriceForProduct(String productId){
    try {
        System.Debug('I am here GetPriceForProduct');
        PriceBookEntry prdPrice =[select Id, Product2Id, UnitPrice from PricebookEntry where Product2Id = :productId And Pricebook2Id in (select Id from Pricebook2 where Name <> 'Standard Price Book') LIMIT 1];
        return prdPrice;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Trainer__c GetTrainerDetails(String productId){
    try {
        System.Debug('I am here GetTrainerDetails');
        Trainer__c trainerDetail =[select Id, Name, Product__c FROM Trainer__c WHERE Product__c = :productId LIMIT 1];
        return trainerDetail;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}