# DataHoarder - A customizable api crawler

A script that queries specified APIs and converts fetched data to json or document objects. Features a schema parser that transcribes schema information to find relevant data to a javascript object for use or storage.

### Schema
Schema Syntax as follows
```
{
    name: {
        first: "user.name.firstname",
        last: "user.name.lastname"
    }
    userId: user.user_id,
    condition: "forecast.forecastday[0].day.condition.text",


}

```
Attributes denotes object properties to define, while values denotes path of the the data value in a JSON object.
'[0]' is an operator denoting first object of array and '[x]' operator for matching objects.
> [!Note] Schema is limited to 2 layers deep

## Project setup
```
git clone https://github.com/coffeenaut/DataHoarder.git
npm install
```
## Deployment
The script was created to run as a node process and scheduled as a cron job for simple management.
ex. `node main.js -f 73301`