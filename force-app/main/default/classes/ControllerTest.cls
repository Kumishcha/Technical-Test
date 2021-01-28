@isTest
private class ControllerTest {
  @isTest
  static void testObjects() {
    Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
    List<Schema.DescribeSObjectResult> obj = new List<Schema.DescribeSObjectResult>();
    for (Schema.SObjectType d : gd.values()) {
      if (d.getDescribe().isAccessible()) {
        obj.add(d.getDescribe());
      }
    }

    Test.startTest();
    List<String> apiNames = Controller.getAPINames();
    Test.stopTest();

    System.assertEquals(obj.size(), apiNames.size());
  }
}

