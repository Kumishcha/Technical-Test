public with sharing class Controller {
    public Controller() {
    }
  
    @AuraEnabled(cacheable=true)
    public static List<String> getAPINames() {
      Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
      List<String> objectsNames = new List<String>();
      for (Schema.SObjectType d : gd.values()) {
        if (d.getDescribe().isAccessible()) {
          objectsNames.add(d.getDescribe().getName());
          System.debug(d.getDescribe());
        }
      }
      objectsNames.sort();
      return objectsNames;
    }
  }
  
