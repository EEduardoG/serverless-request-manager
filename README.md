
## Usage/Examples

### RequestService

The RequestService class provides methods for setting and retrieving various elements from a request event.

#### Importing the RequestService

```javascript
import { RequestService } from 'serverless-request-manager';
```
#### Creating an instance
```javascript
const requestService = new RequestService();
```

#### Setting the event

The setEvent method is used to set the request event data and extract relevant information from it.

```javascript
const event = { /* Your event data */ };
const requestEvent = requestService.setEvent(event);
```

The requestEvent object will contain the parsed payload, query parameters, token information, and other event execution data.

### ResponseService

#### Creating an instance
```javascript
const responseService = new ResponseService();
```

#### Generating responses

The ResponseService provides methods for generating responses for different scenarios such as success, bad request, internal error, not found, unauthorized, and forbidden.
```javascript
const successResponse = responseService.responseSuccess();
const badRequestResponse = responseService.responseBadRequest();
const internalErrorResponse = responseService.responseInternalError();
const notFoundResponse = responseService.responseNotFound();
const unauthorizedResponse = responseService.responseUnauthorized();
const forbiddenResponse = responseService.responseForbidden();
```

You can also pass custom parameters to these methods to override the default response messages and codes.
```javascript
const successResponse = responseService.responseSuccess({
    code:"MY_SUCCESS_CODE",
    data: [{
        message:"You did it right!"
    }]
});
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
  statusCode: 500,
  body: "{\n  \"code\": \"INTERNAL_ERROR\",\n  \"message\": \"Houston we have a problem!\"\n}",
}
```

By passing a custom **IException** object as parameter to setException, you can override the default error code and message.

```json
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
  statusCode: 400,
  body: "{\n  \"code\": \"CUSTOM_CODE_ERROR\",\n  \"message\": \"Bad request.\"\n}",
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

