public with sharing class ContactHandler {
    public static void checkDupEmail(List<Contact> cont){

        Set<String> newEmails = new Set<String>();
        Set<String> existingEmails = new Set<String>();
        
            for( Contact con : cont ) {
            if ( con.Email != null ) {
                newEmails.add(con.Email);
            }
        }
        List<Contact> existingContacts = [Select Id, Email From Contact 
                                             Where Email in :newEmails AND Email != null];
                
        for(Contact ct : existingContacts ) {
            existingEmails.add(ct.Email);
        }
        
        for( Contact ct : cont ) { 
            if ( existingEmails.contains( ct.Email ) ) {
                ct.Email.addError('Contact with same Email is not allowed');
            } else {
                existingEmails.add(ct.Email);
            }
        }
      }
}