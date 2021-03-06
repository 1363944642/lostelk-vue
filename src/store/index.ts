import { axios } from '../service/service'
import { createStore } from 'vuex'

export interface CardList {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    avatar?: number;
    url?: string;
  };
  totalComments: number;
  file: {
    id?: number;
    width: number;
    height: number;
    fakeUrl?: string;
  };
  tags?: unknown;
  totalLikes: number;
  liked: number;
}

export interface GloablUserProps {
  isLogin: boolean;
  id?: number;
  name?: string;
  avatar?: number;
}

export interface GloablErrorProps {
  status: boolean;
  message?: string;
}

export interface GloablfileMetadataProps {
  id: number;
  size: number;
  width: number;
  height: number;
  metadata: {};
}

export interface GloabSearchTagProps {
  tagName: string;
  totalCount: number;
}


export interface GloablDataProps {
  loading: boolean;
  error: GloablErrorProps;
  cardList: CardList[];
  tagCardList: CardList[];
  userPhotosCardList: CardList[];
  userLikeCardList: CardList[];
  card: CardList | {};
  user: GloablUserProps;
  token: string;
  userLikes: CardList[];
  isShowLoading: boolean;
  searchFailure: boolean;
  searchTag: GloabSearchTagProps | {};
  mainSearchIsNone: boolean;
  fileMetadata: GloablfileMetadataProps | {};
  showCommentsCut: boolean;
  homePageCardTotalCount: number | 0;
  tagPageCardTotalCount: number | 0;
  userPhotosCardTotalCount: number | 0;
  userLikeCardTotalCount: number | 0;
  uploadAfterToUrl: string | null;
  fromWhichPage: string | null;
  isShowLoadingMore: boolean;
  noMore: boolean;
  isLoading: boolean;
  againRequest: boolean;
  isLoadingVeryGoods: boolean;
  veryGoodsTransverseList: CardList[];
  veryGoodsLongitudinalList: CardList[];
}

export default createStore<GloablDataProps>({

  state: {
    loading: false,
    error: { status: false },
    cardList: [],
    tagCardList: [],
    userPhotosCardList: [],
    userLikeCardList: [],
    card: {},
    user: { isLogin: false, id: Number(localStorage.getItem('userId')) || -1 },
    token: localStorage.getItem('token') || '',
    userLikes: [],
    isShowLoading: true,
    searchFailure: false,
    mainSearchIsNone: true,
    fileMetadata: {},
    showCommentsCut: false,
    searchTag: {},
    homePageCardTotalCount: 0,
    tagPageCardTotalCount: 0,
    userPhotosCardTotalCount: 0,
    userLikeCardTotalCount: 0,
    uploadAfterToUrl: null,
    fromWhichPage: null,
    isShowLoadingMore: false,
    noMore: false,
    isLoading: true,
    againRequest: false,
    isLoadingVeryGoods: true,
    veryGoodsTransverseList: [],
    veryGoodsLongitudinalList: []
  },

  mutations: {

    /**
     * 修改是否进行加载精选图
     */
    alterIsLoadingVeryGoods(state, rawData) {
      state.isLoadingVeryGoods = rawData
    },

    /**
     * 添加精选图
     * 横图/纵图
     */
    getVeryGoodsTransverseList(state, rawData) {
      state.veryGoodsTransverseList = rawData
    },
    getVeryGoodsLongitudinalList(state, rawData) {
      state.veryGoodsLongitudinalList = rawData
    },

    /**
     * 重新请求
     */
    againRequest(state, rawData) {
      state.againRequest = rawData
    },
    /**
     * 登陆
     */
    login(state, rawData) {
      state.token = rawData.token
      localStorage.setItem('token', rawData.token)
      localStorage.setItem('userId', rawData.id)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.token}`
    },

    /**
     * 获取当前用户信息
     */
    getCurrentUser(state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },

    /**
     * 退出登陆
     */
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      delete axios.defaults.headers.common.Authorization
      state.user = {
        isLogin: false,
        id: -1
      }
      state.userLikes = []
    },

    /**
     * 获得卡片列表
     */
    getCardList(state, rawdata) {
      state.cardList = rawdata
    },

    /**
     * 添加卡片列表
     */
    getPageCardList(state, rawdata) {
      state.cardList.push(...rawdata)
    },

    /**
     * 获取主页卡片总数
     */
    getHomePageCardTotalCount(state, rawdata) {
      state.homePageCardTotalCount = rawdata
    },

    /**
     * 删除主页中的某一项后的卡片总数
     */
    deteleHomePageCardTotalCount(state, rawdata) {
      state.homePageCardTotalCount = rawdata - 1
    },

    /**
     * 或得单个卡片
     */
    cardData(state, rawdata) {
      state.card = rawdata
    },

    /**
     * 获得指定标签的卡片内容
     */
    getTagCardList(state, rawdata) {
      state.tagCardList = rawdata
    },

    /**
     * 添加指定标签的卡片内容
     */
    getPageTagCardList(state, rawdata) {
      state.tagCardList.push(...rawdata)
    },

    /**
      * 获得指定标签的卡片总数
      */
    getTagPageCardTotalCount(state, rawdata) {
      state.tagPageCardTotalCount = rawdata
    },

    /**
     * 删除指定标签中的某一项后的卡片总数
     */
    deteleTagPageCardTotalCount(state, rawdata) {
      state.tagPageCardTotalCount = rawdata - 1
    },

    /**
    * 获取指定用户发表的内容列表
    */
    getUserPhotosCardList(state, rawdata) {
      state.userPhotosCardList = rawdata
    },

    /**
   * 添加指定用户发表的卡片列表
   */
    getPageUserPhotosCardList(state, rawdata) {
      state.userPhotosCardList.push(...rawdata)
    },

    /**
     * 获取指定用户发表的内容的数量
     */
    getUserPhotosCardTotalCount(state, rawdata) {
      state.userPhotosCardTotalCount = rawdata
    },

    /**
     * 获取指定用户喜欢的内容列表
     */
    getUserLikeCardList(state, rawdata) {
      state.userLikeCardList = rawdata
    },

    /**
   * 获取指定用户喜欢的内容的数量
   */
    getUserLikeCardTotalCount(state, rawdata) {
      state.userLikeCardTotalCount = rawdata
    },

    /**
     * 添加指定用户喜欢的内容列表
     */
    getPageUserLikeCardList(state, rawdata) {
      state.userLikeCardList.push(...rawdata)
    },
    /**
     * loading
     */
    setLoading(state, status) {
      state.loading = status
    },

    /**
     * 全局错误
     */
    setError(state, e: GloablErrorProps) {
      state.error = e
    },

    /**
     * 当前登陆用户点赞过的内容列表
     */
    getUserLikes(state, rawdata) {
      state.userLikes = rawdata
    },

    /**
     * 修改isShowLoading状态
     */
    setIsShowLoading(state, rawdata) {
      state.isShowLoading = rawdata
    },

    /**
     * 修改mainSearchIsNone显示状态
     */
    mainSearchIsNone(state, rawdata) {
      state.mainSearchIsNone = rawdata
    },

    /**
     * 修改搜索结果
     */
    setSearchFailure(state, rawdata) {
      state.searchFailure = rawdata
    },

    /**
    * 传入搜索标签
    */
    setSearchTag(state, rawdata) {
      state.searchTag = rawdata
    },

    /**
     * 点赞 修改卡片的like状态与值
     */
    clickLike(state, postId) {
      for (let i = 0; i < state.cardList.length; i++) {
        if (state.cardList[i].id === postId) {
          state.cardList[i].liked = 1;
          state.cardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.tagCardList.length; i++) {
        if (state.tagCardList[i].id === postId) {
          state.tagCardList[i].liked = 1;
          state.tagCardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.userPhotosCardList.length; i++) {
        if (state.userPhotosCardList[i].id === postId) {
          state.userPhotosCardList[i].liked = 1;
          state.userPhotosCardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.userLikeCardList.length; i++) {
        if (state.userLikeCardList[i].id === postId) {
          state.userLikeCardList[i].liked = 1;
          state.userLikeCardList[i].totalLikes++;
          break;
        }
      }
    },
    /**
    * 取消点赞 修改卡片的like状态与值
    */
    cancelLike(state, postId) {
      for (let i = 0; i < state.cardList.length; i++) {
        if (state.cardList[i].id === postId) {
          state.cardList[i].liked = 0;
          state.cardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.tagCardList.length; i++) {
        if (state.tagCardList[i].id === postId) {
          state.tagCardList[i].liked = 0;
          state.tagCardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.userPhotosCardList.length; i++) {
        if (state.userPhotosCardList[i].id === postId) {
          state.userPhotosCardList[i].liked = 0;
          state.userPhotosCardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.userLikeCardList.length; i++) {
        if (state.userLikeCardList[i].id === postId) {
          state.userLikeCardList[i].liked = 0;
          state.userLikeCardList[i].totalLikes--;
          break;
        }
      }
    },

    /**
     * 获取当前图像文件的元数据
     */
    fileMetadata(state, rawdata) {
      state.fileMetadata = rawdata
    },

    /**
     * 切换评论列表显示隐藏
     */
    showCommentsCut(state, rawdata) {
      state.showCommentsCut = rawdata
    },

    /**
     * 获取 uploadPicture 是从哪个url进入的
     */
    uploadAfterToUrl(state, rawdata) {
      state.uploadAfterToUrl = rawdata
    },

    /**
     * fromWhichPage
     * 获取是从那个页面进来的
     */
    fromWhichPage(state, rawdata) {
      state.fromWhichPage = rawdata
    },

    /**
    * 设置 是否显示 加载更多提示
    */
    isShowLoadingMore(state, rawdata) {
      state.isShowLoadingMore = rawdata
    },

    /**
    * 设置是否显示 没有更多 提示
    */
    noMore(state, rawdata) {
      state.noMore = rawdata
    },


  },


  actions: {

    /**
     * 登陆
     */
    async login(context, userLoginData) {
      try {
        const loginData = await axios.post('/login', userLoginData)
        context.commit('login', loginData.data)
        return loginData
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 获取当前用户信息
    */
    async getCurrentUser(context, currentUserId) {
      try {
        const currentUserData = await axios.get(`/users/${currentUserId}`)
        context.commit('getCurrentUser', currentUserData)
        return currentUserData
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 登陆 + 获取当前用户信息的组合
     */
    loginAndGetCurrentUser(context, userLoginData) {
      return context.dispatch('login', userLoginData).then(data => {
        if (data) {
          return context.dispatch('getCurrentUser', data.data.id)
        }
      })
    },

    /**
   * 修改当前登陆用户的用户名
   */
    async patchUserName(context, newUserNameObject) {
      try {
        await axios.patch('/users', newUserNameObject)
      } catch (error) {
        console.log(error)
      }
    },


    /**
    * 获得卡片列表
    */
    async getCardList(context) {
      try {
        const CardListData = await axios.get('/posts')
        context.commit('getCardList', CardListData.data)
        context.commit('getHomePageCardTotalCount', CardListData.headers['x-total-count'])
        return CardListData
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * 卡片列表分页加载
    */
    async getPageCardList(context, page) {
      try {
        const CardListData = await axios.get(`/posts?page=${page}`)
        context.commit('getPageCardList', CardListData.data)
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取指定用户发表的内容列表
     */
    async getUserPhotosCardList(context, userId) {
      try {
        const userPhotosCardListData = await axios.get(`/posts?user=${userId}&action=published`)
        context.commit('getUserPhotosCardList', userPhotosCardListData.data)
        context.commit('getUserPhotosCardTotalCount', userPhotosCardListData.headers['x-total-count'])
        return userPhotosCardListData
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取指定用户发表的内容分页列表
     */
    async getPageUserPhotosCardList(context, { userId, page }) {
      try {
        const userPhotosCardListData = await axios.get(`/posts?user=${userId}&action=published&page=${page}`)
        context.commit('getPageUserPhotosCardList', userPhotosCardListData.data)
        context.commit('getUserPhotosCardTotalCount', userPhotosCardListData.headers['x-total-count'])
        return userPhotosCardListData
      } catch (error) {
        console.log(error);
      }
    },


    /**
    * 获取指定用户喜欢的内容列表
    */
    async getUserLikeCardList(context, userId) {
      try {
        const userLikeCardList = await axios.get(`/posts?user=${userId}&action=liked`)
        context.commit('getUserLikeCardList', userLikeCardList.data)
        context.commit('getUserLikeCardTotalCount', userLikeCardList.headers['x-total-count'])
        return userLikeCardList
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * 获取指定用户喜欢的内容分页列表
    */
    async getPageUserLikeCardList(context, { userId, page }) {
      try {
        const userLikeCardListData = await axios.get(`/posts?user=${userId}&action=liked&page=${page}`)
        context.commit('getPageUserLikeCardList', userLikeCardListData.data)
        context.commit('getUserLikeCardTotalCount', userLikeCardListData.headers['x-total-count'])
        return userLikeCardListData
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获得单个卡片内容
     */
    async getCard(context, postId) {
      try {
        const cardData = await axios.get(`/posts/${postId}`)
        context.commit('cardData', cardData.data)
        return cardData.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 获得指定标签的卡片列表
     */
    async getTagCardList(context, tag) {
      try {
        const TagCardListData = await axios.get(`/posts?tag=${tag}`)
        context.commit('getTagCardList', TagCardListData.data);
        context.commit('getTagPageCardTotalCount', TagCardListData.headers['x-total-count'])
        context.commit('setSearchTag', {
          tagName: tag,
          totalCount: TagCardListData.headers['x-total-count']
        })
        return TagCardListData
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获得指定标签的卡片列表分页
     */
    async getPageTagCardList(context, { tag, page }) {
      try {
        const TagCardListData = await axios.get(`/posts?tag=${tag}&page=${page}`)
        context.commit('getPageTagCardList', TagCardListData.data);
        return TagCardListData
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获得当前登陆用户赞过的内容列表
     */
    async getUserLikes(context, userId) {
      try {
        if (context.state.user.isLogin) {
          const userLikes = await axios.get(`/posts?user=${userId}&action=liked`)
          context.commit('getUserLikes', userLikes.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取当前文件的元数据信息
     */
    async getFileMetadata(context, fileId) {
      try {
        const fileMetadata = await axios.get(`/files/${fileId}/metadata`)
        context.commit('fileMetadata', fileMetadata.data)
        return fileMetadata.data
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取当前内容的评论列表
     */
    async getComments(context, postId) {
      try {
        const comments = await axios.get(`/comments?post=${postId}`)
        return comments
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 获取当前的评论的回复评论列表
     */
    async getReplyComments(context, commentId) {
      try {
        const comments = await axios.get(`/comments/${commentId}/replies`)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 发表评论
     */
    async publishComments(context, publishCommentData) {
      try {
        const comments = await axios.post(`/comments`, publishCommentData)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 回复评论
    */
    async publishReplyComment(context, { commentId, publishReplyCommentData }) {
      try {
        const comments = await axios.post(`/comments/${commentId}/reply`, publishReplyCommentData)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 修改评论
     */
    async reviseComment(context, { commentId, reviseCommentData }) {
      try {
        const comments = await axios.patch(`/comments/${commentId}`, reviseCommentData)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 删除评论
     */
    async deleteComment(context, commentId) {
      try {
        const comments = await axios.delete(`/comments/${commentId}`)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 删除卡片
     */
    async deleteCard(context, postId) {
      try {
        const comments = await axios.delete(`/posts/${postId}`)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 请求上传内容标签
    */
    async createTag(context, { postId, tag }) {
      try {
        await axios.post(`/posts/${postId}/tag`, { name: `${tag}` });
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * 删除内容标签
    */
    async deleteTag(context, { postId, tagId }) {
      try {
        await axios.delete(`/posts/${postId}/tag`, { data: { tagId: `${tagId}` } });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取精选横图
     */
    async getVeryGoodsTransverseList(context, tagName) {
      try {
        const veryGoodsTransverseData = await axios.get(`/posts?tag=${tagName}`);

        context.commit('getVeryGoodsTransverseList', veryGoodsTransverseData.data)
        return veryGoodsTransverseData
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 获取精选横图
     */
    async getVeryGoodsLongitudinalList(context, tagName) {
      try {
        const getVeryGoodsLongitudinalData = await axios.get(`/posts?tag=${tagName}`);

        context.commit('getVeryGoodsLongitudinalList', getVeryGoodsLongitudinalData.data)
        return getVeryGoodsLongitudinalData
      } catch (error) {
        console.log(error)
      }
    }
  },

  getters: {

  },

  modules: {
  }
})
