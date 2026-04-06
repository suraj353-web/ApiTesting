import {test, expect} from '@playwright/test';

test("API header verification", async ({request}) => {
    const response = await request.get("https://api.demoblaze.com/entries");
    const headers = response.headers();
    console.log(headers);

    expect(headers.server).toEqual("Google Frontend");
    expect(headers['content-type']).toEqual("application/json");

    console.log("************************************************");

    const haedersArrayValues= response.headersArray();
    console.log(haedersArrayValues);
    console.log(haedersArrayValues.length);



})