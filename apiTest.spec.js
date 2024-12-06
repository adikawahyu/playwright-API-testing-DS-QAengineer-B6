const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv();

test("GET Request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  console.log(await response.json());

  expect(response.status()).toEqual(200);
  expect(response.ok()).toBeTruthy();

  const valid = ajv.validate(
    require("./json-schema/add-object.schema.json"),
    response.json
  );

  if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(valid).toBe(false);
});

test("POST Request", async ({ request }) => {
  const reqHeaders = {
    Accept: "application.json",
  };

  const body = {
    name: "morpheus",
    job: "leader",
  };

  const response = await request.post("https://reqres.in/api/users", {
    headers: reqHeaders,
    data: body,
  });

  expect(response.status()).toEqual(201);
  expect(response.ok()).toBeTruthy();

  const resBody = await response.json();
  expect(resBody.name).toEqual("morpheus");

  const valid = ajv.validate(
    require("./json-schema/add-object.schema.json"),
    resBody
  );

  if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(valid).toBe(true);
});

test("DELETE Request", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2");

  expect(response.status()).toEqual(204);
  expect(response.ok()).toBeTruthy();

  const valid = ajv.validate(
    require("./json-schema/add-object.schema.json"),
    response.json
  );
});

test("PUT Request", async ({ request }) => {
  const reqHeaders = {
    Accept: "application.json",
  };

  const body = {
    name: "Adika",
    job: "Software Engineer",
  };

  const response = await request.put("https://reqres.in/api/users/2", {
    headers: reqHeaders,
    data: body,
  });

  expect(response.status()).toEqual(200);
  expect(response.ok()).toBeTruthy();

  const resBody = await response.json();
  expect(resBody.name).toEqual("Adika");

  const valid = ajv.validate(
    require("./json-schema/add-object.schema.json"),
    resBody
  );

  if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(valid).toBe(true);
});
