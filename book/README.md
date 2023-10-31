#
http://localhost:4000/api/v1/book/add-book - This endpoint is for adding the deteils of the book, It contains Book Name, Author Name and Summary. This api also contains validations and all the three fields which are Book Name, Author Name, Summary are required and should be valid strings.

http://localhost:4000/api/v1/book/get-book-list - This endpoint is for getting the list of the books in the Database. It also contains pagination and search filter. One can pass the values in page, size and serch to see the desired results.

http://localhost:4000/api/v1/book/get-book-by-id?id=id - This endpoint is for getting a particular book present in the Database by passing it's id in params. If id is not present in the Database then it display the messsage of not found. This api have validation that id must be required otherwise it will show message that id is required. 

http://localhost:4000/api/v1/book/update-book-by-id?id=id - This endpoint is for updating a particular book present in the Database by passing it's id in params. If id is not present in the Database then it display the messsage of not found. This api have validation that id must be required otherwise it will show message that id is required. This api also contains validations and all the three fields which are Book Name, Author Name, Summary are optional and should be valid strings.

http://localhost:4000/api/v1/book/delete-book-by-id?id=id - This endpoint is for deleting a particular book present in the Database by passing it's id in params. If id is not present in the Database then it display the messsage of not found. This api have validation that id must be required otherwise it will show message that id is required. 


