# This is my first project using react, express, node js and mongodb. 


# i want to use operation condition rendering for the token
You need to use the optional chaining operator—?.—when accessing the token property because when you first access the application, the value of sessionStorage.getItem('token') will be undefined. If you try to access a property, you will generate an error.

Save and close the file. In this case, you already have a token stored, so when the browser refreshes, you will navigate to the private pages