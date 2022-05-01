import { AppState } from "../AppState"
import { api } from "./AxiosService"

class PostsService {
 async getAllPosts(){
   const res = await api.get('api/posts')
   console.log(res.data.posts[0])
   AppState.posts = res.data.posts
 }
 async getByQuery(params){
   console.log(params)
   const res = await api.get('api/posts/', { params })
   AppState.searchResults = res.data.posts
 }
 async createPost(editable){
   const res = await api.post('api/posts', editable)
   console.log(res.data)
   AppState.posts.push(res.data)
 }
}

export const postsService = new PostsService()