import {test, request, APIRequestContext, expect} from '@playwright/test';

let requestContext: APIRequestContext;

test.beforeAll("before all hook", async () => {

   requestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
         extraHTTPHeaders: {
        Accept: "application/json"
    }
        
        
    });


});

test("GET request to API 1", async ({request}) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking");
 
    console.log(await response.json());
    
    
})

test("GET request to API 2", async ({}) => {

   
    const response = await requestContext.get("/booking");
    console.log(await response.json());
 
    
})

test("GET request to API 3", async ({}) => {
    const response = await requestContext.get("/booking/1");
    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toMatchObject({
            firstname: 'James',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
            additionalneeds: 'Breakfast'
            })

    const JsonResponse = await response.json();
    expect(JsonResponse.firstname).toBe("James");
    expect(JsonResponse.lastname).toBe("Brown");
})

test("GET request to API 4", async ({}) => {
    const response = await requestContext.get("booking",{
        params: {
            firstname: "sally",
            lastname: "brown"
        }   
    });
    console.log(await response.json());
    
})




// also we can write baseurl in config file and then we can directly use endpoint in test file like below