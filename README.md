


# serverless-request-manager

**serverless-request-manager** is a Node.js library that simplifies request and response management for serverless applications (e.g., AWS Lambda, API Gateway, etc). It provides utilities to parse events, extract parameters, decode JWT tokens, and generate standard HTTP responses for various scenarios.

---

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

---

## Description

This library abstracts the manipulation of events and responses in serverless environments, allowing you to:
- Parse and structure incoming events.
- Extract and decode JWT tokens.
- Generate standard HTTP responses (success, error, unauthorized, etc).

Ideal for projects that require consistent and reusable request/response handling in serverless functions.

---

## Installation

```bash
npm install serverless-request-manager
```

---

## Basic Usage

### Import and create instances

```javascript
import { RequestService, ResponseService } from 'serverless-request-manager';

const requestService = new RequestService();
const responseService = new ResponseService();
```

### Parse an event

```javascript
const event = {
  body: '{"foo": "bar"}',
  queryStringParameters: '{"search": "abc"}',
  headers: { authorization: 'Bearer <jwt-token>' },
  requestContext: { /* ... */ }
};

const requestEvent = requestService.setEvent(event);
// requestEvent: { payload, queryParams, token, eventExecutionData, eventRaw }
```

### Generate standard responses

```javascript
const ok = responseService.responseSuccess();
const badRequest = responseService.responseBadRequest();
const internalError = responseService.responseInternalError();
const notFound = responseService.responseNotFound();
const unauthorized = responseService.responseUnauthorized();
const forbidden = responseService.responseForbidden();
```

#### Custom response

```javascript
const custom = responseService.responseSuccess({
  code: 'MY_SUCCESS_CODE',
  data: [{ message: 'You did it right!' }]
});
```

Returns an object:
```json
{
  "statusCode": 200,
  "body": "{\n  \"code\": \"MY_SUCCESS_CODE\",\n  \"message\": \"You did it right!\"\n}",
}
```

### Setting an exception
The setException method is used to set an exception or error in the request service. This can be useful for capturing and handling errors during request processing.
```javascript
const error = new Error('An error occurred');
return requestService.setException(error);
```

It returns: 
```json
{
  "statusCode": 500,
  "body": "{\n  \"code\": \"INTERNAL_ERROR\",\n  \"message\": \"Houston we have a problem!\"\n}",
}
```

By passing a custom **IException** object as parameter to setException, you can override the default error code and message.

```javascript
const error: IException = {
    code: "CUSTOM_CODE_ERROR",
    body: "This is a custom error.",
    exceptionCode: ExceptionCode.BAD_REQUEST
}
return requestService.setException(error);
```

It returns: 
```json
{
  "statusCode": 400,
  "body": "{\n  \"code\": \"CUSTOM_CODE_ERROR\",\n  \"message\": \"Bad request.\"\n}",
}
```




## Contribution
Contributions are welcome! If you want to improve this package or report any issues, please follow these steps:

#### 1. Fork the repository.

#### 2. Create a new branch 
(git checkout -b feature/feature-name).

#### 3. Make the necessary changes
and commit them (git commit -am 'Add new feature').

#### 4. Push your changes 
to the remote repository (git push origin feature/feature-name).
Open a pull request on GitHub.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE). file for more details.