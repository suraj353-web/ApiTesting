import { test, expect } from '@playwright/test';

test("DELETE request to API", async ({request}) => {

const response = await request.delete("https://restful-booker.herokuapp.com/booking/912",{
    headers: {
        Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        ContentType: "application/json"
    }
})

expect(response.status()).toBe(201);
expect(response.ok()).toBeTruthy();
expect(response.statusText()).toBe("Created");



})