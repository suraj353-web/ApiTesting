import {test, expect, Locator} from '@playwright/test';

test("API with UI verification", async ({request,page}) => {
    const response = await request.get("https://api.demoblaze.com/entries");
    console.log(await response.json()); 

    const jsonResponse = await response.json();
    expect(jsonResponse.Items[0].title).toEqual("Samsung galaxy s6");
    const Mtitle = jsonResponse.Items[0].title;
    console.log(Mtitle);
    

    page.goto("https://demoblaze.com/");
    const  Title: Locator = page.locator('//*[@id="tbodyid"]/div[1]/div/div/h4/a');
    await expect(Title).toHaveText(Mtitle);





});