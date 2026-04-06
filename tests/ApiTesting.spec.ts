import {test, expect} from '@playwright/test';

let bookingId: number;
let tokenValue: string;

test.describe.serial("API Testing with Authentication", () => {


test.beforeAll("request to API for token", async ({request}) => {

    const response = await request.post("/auth",{
        data: {
            "username" : "admin",
            "password" : "password123"
        }
        
    })
    tokenValue = (await response.json()).token;
    console.log(tokenValue);

})

test("POST request to create new booking", async ({request}) => {

    const response = await request.post("/booking",{
        data: {
                "firstname" : "Suraj",
                "lastname" : "Kundu",
                "totalprice" : 10000,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast/Dinner"
            }
    })
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    bookingId = (await response.json()).bookingid;


    })

    test("GET request to retrieve booking details", async ({request}) => {

        const response = await request.get("/booking/" + bookingId);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        expect(jsonResponse.firstname).toBe("Suraj");
        expect(jsonResponse.lastname).toBe("Kundu");

    })


test("Authentication for PUT request with token", async ({request}) => {

    const response = await request.put("/booking/" + bookingId,{
        headers: {
            "Cookie": "token=" + tokenValue
        },
        data: {
                "firstname" : "Suraj",
                "lastname" : "Kundu",
                "totalprice" : 20000,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast/Dinner/Lunch"
            }
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect((await response.json()).totalprice).toBe(20000);
    expect((await response.json()).additionalneeds).toBe("Breakfast/Dinner/Lunch");
});


test("Authentication for DELETE request with token", async ({request}) => {

    const response = await request.delete("/booking/" + bookingId,{

        headers: {
            "Cookie": "token=" + tokenValue,
            ContentType: "application/json"
            
        }
    });
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe("Created");


})
})