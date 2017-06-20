import { ApiCreator } from './src/example/'

new ApiCreator(newBook, { host: 'http://localhost:3000' })
  .GetPosts({ id: 1 })
  .then(res => console.log(res))
  .catch(err => console.log(err))