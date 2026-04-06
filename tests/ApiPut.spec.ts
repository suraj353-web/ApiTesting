import {expect, test} from '@playwright/test';

test("PUT request to API", async ({request}) => {

    const response = await request.put("https://restful-booker.herokuapp.com/booking/1",{
        data: {
                "firstname" : "James",
                "lastname" : "Brown",
                "totalprice" : 1111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            },

             headers: {
        Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
    }
            
    })
   
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const jsonResponse = await response.json();
    expect(jsonResponse.totalprice).toBe(1111);
    console.log(jsonResponse);
    







})