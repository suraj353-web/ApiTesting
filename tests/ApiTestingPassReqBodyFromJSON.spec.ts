import { expect,test } from "@playwright/test";
import apiData from "../tests/testdata/apidata.json";

test("POST request to API with body from JSON file", async ({request}) => {

    const response = await request.post("https://restful-booker.herokuapp.com/booking",{
        data: apiData,

    })

    const jsonResponse = await response.json();
    expect(response.status()).toBe(200);
    expect(jsonResponse.booking).toMatchObject(apiData);
    expect(jsonResponse.booking.additionalneeds).toBe("Breakfast");


    })