import {expect, test} from '@playwright/test';

test("POST request to API", async ({request}) => {

   const response = await request.post("https://api.demoblaze.com/addtocart",{

        data: {"id":"e9982ea9-1586-aa50-3bde-a6950d36b2d8","cookie":"user=bfa7e8b1-94f6-9434-eeff-fb3c0e51c7fa","prod_id":3,"flag":false}

    })
    
    
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    







})