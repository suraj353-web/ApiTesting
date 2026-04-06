import {test, request, APIRequestContext, expect} from '@playwright/test';

let requestContext: APIRequestContext;

test.beforeAll("Post Api request", async () => {

   requestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        
    });
    });

    test("POST request to API 1", async ({request}) => {

       const response = await requestContext.post("/booking",{
                        data: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
        }
    })
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());

    })


