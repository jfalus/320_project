Sequelize

We are using the JavaScript library to interact with our database. This document is going to go over what we have done with it so far.

1. Credentials
The credentials are stored in the .env file in the root. To access the database with psql in your command line, you can use this command:
psql -h ec2-44-193-188-118.compute-1.amazonaws.com -d d5c4r711daleuf -U pmykybuouedzak

The password is:
09807d514a8fd156e0cf3d91850f85de24c1301ffcf5abad52e718ca801225fb

2. Models
"Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model."

In our project, we define each model as a different .js file and export it to be read by sequelizeConstructor.js. We will go over the format of the model .js files.

We will first define the schema for the model. Each field is type-sensitive, and its value is the DataType, and whether it is a primary key of the model. You can find out the different DataTypes here: https://sequelize.org/v5/manual/data-types.html
At the end of the file, we export the model as an array, with the first element being the name of the table (case-sensitive), and the second being the schema.

3. Queries
