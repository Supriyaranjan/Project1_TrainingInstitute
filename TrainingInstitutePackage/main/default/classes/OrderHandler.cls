public with sharing class OrderHandler {
    public static void TotalAmountUpdateonAccount(List<Order> modifiedOrders) {

        Set<Id> actIds = new Set<Id>();
        for( Order ord : modifiedOrders ) {
            if ( ord.AccountId != null ) {
                actIds.add(ord.AccountId);
            }
        }

        AggregateResult[] accWithrdr = [select AccountId, sum(TotalAmount) from Order WHERE AccountId in :actIds GROUP BY AccountId]; 
    
        for(AggregateResult acc : accWithrdr){
            
            System.debug('Account ID:' + acc.get('AccountId'));
            System.debug('Total Amount:' + acc.get('expr0'));
            Account acctRec = [Select Id, Name, Total_Order__c from Account where Id = :(Id)acc.get('AccountId') LIMIT 1 ]; 
            acctRec.Total_Order__c = Integer.valueof(acc.get('expr0'));
            update acctRec;
    }
}
}