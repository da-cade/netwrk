import { AppState } from "../AppState"
import { api } from "./AxiosService"

class PostsService {
 async getAllPosts(){
   const res = await api.get('api/posts')
   console.log(res.data.posts[0])
   AppState.posts = res.data.posts
 }
 async getPostByQuery(params){
   const res = await api.get('api/posts/', {params})
   AppState.searchResults = res.data.posts
 }
}

export const postsService = new PostsService()