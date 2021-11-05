
# Introduction

### Documentation for Send Mailing and Adding Users.  
You can use this API for adding new users to the system and send mails for the added users using CSV

## Add New User
This api is used to add new user to the system
`POST localhost:3002/api/user/`

## GET User Details
This api is used to get the details of users
`GET localhost:3002/api/user/`

## Send Mail
This api is used to send mails to users in csv file
`POST localhost:3002/api/mail`

### URL Parameters - Add New User

Parameter | Description
--------- | -----------
firstname | User first name
lastname 	 | User last name
email | Mail ID of user
age | User Age


[`curl --location --request POST 'localhost:3002/api/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstname":"Alex",
    "lastname":"Sam",
    "email":"gabalunu@musiccode.me",
    "age":22
}')



> The above command returns JSON structured like this:

```json
{
    "message": "New user added.!",
    "data": {
        "firstname": "Alex",
        "lastname": "Sam",
        "email": "gabalunu@musiccode.me",
        "age": 22,
        "_id": "6185bbba197890a9b8d1063e",
        "__v": 0
    }
}
```

### URL Parameters - Send Mail API

Parameter | Description
--------- | -----------
file | CSV file with columns  : mail , name, content
[curl --location --request POST 'localhost:3002/api/mail' \
--form 'file=@"/C:/Users/liyan/Downloads/mail.csv"']

>You can find a sample file in data/csv path
> The above command returns JSON structured like this:

```json
{
    "status": "success",
    "message": "Mail sent successfully"
}
```

## Configuration
1) Need to create .env file with necessary keys
2) Install the needed dependencies using npm.
	npm install
3) Make sure also devDependencies were installed
4) Use npm run dev - to run in local


