microblogging platform made for educational purposes.
<h3> Necessary variables: </h3>
<h5>JWT_SECRET</h5>     -can be any string value  <br />
<h5>MONGODB_URI</h5>    -your Mongo database URI address  <br />
<h5>NODE_ENV</h5>       -"production" for production build, "development" for development build  <br /> 
<h5>AWS_ID</h5>         -your aws ID, needed for the aws S3 storage to work. For more detailed information check the amazon AWS documentation <br />
<h5>AWS_SECRET</h5>         -your aws access key, needed for the aws S3 storage to work. For more detailed information check the amazon AWS documentation <br />
<h5>AWS_BUCKET_NAME</h5>         -your aws S3 bucket name, needed for the aws S3 storage to work. For more detailed information check the amazon AWS documentation <br /><br />
For development build it may be necessery to create the config.env file in config directory. This file should contain mentioned above variables and their values.
