- [Auth](#auth)
  - [`api/auth/register`](#apiauthregister)
    - [Create New User](#create-new-user)
  - [`api/auth/login`](#apiauthlogin)
    - [Login](#login)
- [Books](#books)
  - [`api/books`](#apibooks)
    - [Get all books in database](#get-all-books-in-database)
  - [`api/books/:id`](#apibooksid)
    - [Get single book](#get-single-book)
  - [`api/books/new`](#apibooksnew)
    - [Add new book](#add-new-book)
  - [`api/books/update/:id`](#apibooksupdateid)
    - [Update exisitng book](#update-exisitng-book)
  - [`api/books/delete/:id`](#apibooksdeleteid)
    - [Delete exisitng book](#delete-exisitng-book)

## Auth

### `api/auth/register`

#### Create New User

```
METHOD:POST
Content-Type: application/json
Body:
{
login
passoword
}
Return:
{
  {success:true}
}
```

### `api/auth/login`

#### Login

```
METHOD:POST
Content-Type: application/json
Body:
{
login
passoword
}
Return:
{
  api_token
}
```

## Books

### `api/books`

#### Get all books in database

```
METHOD:GET
Authorization: api/books?api_token
Return:
{
  [
    {
      _id,
      author,
      title,
      release_date
    }
  ]
}
```

### `api/books/:id`

#### Get single book

```
METHOD:GET
Authorization: api/books/<id>?api_token
Content-Type: application/json

Return:
{
    {
      _id,
      author,
      title,
      release_date
    }
}
```

### `api/books/new`

#### Add new book

```
METHOD:POST
Authorization: api/books/new?api_token
Content-Type: application/json
Body:
{
author
title
release_date
}
Return:
{
_id
author
title
release_date
}
```

### `api/books/update/:id`

#### Update exisitng book

```
METHOD:PUT
Authorization: api/books/update/<id>?api_token
Content-Type: application/json
Body:
{
author
title
release_date
}
Return:
{
_id
author
title
release_date
}
```

### `api/books/delete/:id`

#### Delete exisitng book

```
METHOD:DELETE
Authorization: api/books/delete/<id>?api_token
Content-Type: application/json
Body:
{
author
title
release_date
}
Return:
{success:true}
```
