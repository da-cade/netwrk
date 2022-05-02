import { AppState } from "../AppState"
import { api } from "./AxiosService"

class PostsService {
 async getAllPosts(){
   const res = await api.get('api/posts')
   AppState.posts = res.data.posts
   AppState.pageData = {
     page: res.data.page,
     pageNum: parseInt(res.data.page[0]),
     totalPages: res.data.totalPages,
     newer: res.data.newer,
     older: res.data.older
   }
 }
 async getByQuery(params){
   const res = await api.get('api/posts/', { params })
   AppState.searchResults = res.data.posts
   AppState.pageData = {
    page: res.data.page,
    totalPages: res.data.totalPages,
    newer: res.data.newer,
    older: res.data.older
  }
 }
 async getByPage(index, user){
  let res
  if(!user){
    res = await api.get('api/posts/?page=' + index)
    AppState.posts = res.data.posts
  }
  else {
    res = await api.get('api/posts?creatorId=' + user.id + '&page=' + index)
    AppState.searchResults = res.data.posts
  }
  AppState.pageData = {
    page: res.data.page,
    totalPages: res.data.totalPages,
    newer: res.data.newer,
    older: res.data.older
  }
  
 }
 async createPost(editable){
   const res = await api.post('api/posts', editable)
   AppState.posts.unshift(res.data)
   AppState.posts = AppState.posts
 }
 async toggleLike(profile, post){
   if(profile === {}){
     throw new Error("You shouldn't be able to do this, hacher")
   }
  const res = await api.post('api/posts/' + post.id + '/like', profile)
  const index = AppState.posts.findIndex(p => p.id == res.data.id)
  AppState.posts[index] = res.data
  AppState.posts = AppState.posts
  }   
  async deletePost(post){
    await api.delete('api/posts/' + post.id)
    AppState.posts = AppState.posts.filter(p => p.id !== post.id)
  }

}

export const postsService = new PostsService()