import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt'

type Data = {
  login:string,
  password:string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {

}
