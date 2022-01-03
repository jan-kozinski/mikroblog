microblogging platform made for educational purposes. Project is abandond, but have been rewritten, and the newer version is still being developed. Too see the newer version proceed to https://github.com/jan-kozinski/mikroblog-v2
<h3> Necessary variables: </h3>
<h5>JWT_SECRET</h5>     -can be any string value  <br />
<h5>MONGODB_URI</h5>    -your Mongo database URI address  <br />
<h5>NODE_ENV</h5>       -"production" for production build, "development" for development build  <br /> 
<h5>AWS_ID</h5>         -your aws ID, needed for the aws S3 storage to work. For more detailed information check the amazon AWS documentation <br />
<h5>AWS_SECRET</h5>         -your aws access key, needed for the aws S3 storage to work. For more detailed information check the amazon AWS documentation <br />
<h5>AWS_BUCKET_NAME</h5>         -your aws S3 bucket name, needed for the aws S3 storage to work. For more detailed information check the amazon AWS documentation <br /><br />
For development build, it may be necessary to create the config.env file in the config directory. This file should contain mentioned above variables and their values.
