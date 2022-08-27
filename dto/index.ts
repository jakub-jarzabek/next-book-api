import { ObjectId } from 'mongodb'
import {z} from 'zod'

export interface Book{
  author:string,
  release_date:string,
  title:string
  _id?:ObjectId
}
export interface User {
  login:string,
  password:string,
  _id?:ObjectId
}

export interface ApiError {
  error:string
}

export const  BookSchema = z.object({
  author:z.string(),
  release_date:z.string(),
  title:z.string()
})

