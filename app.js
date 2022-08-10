const app = Vue.createApp({
  data(){
    return{
      inputUser: '',
      requestError: false,
      requestStatus: '',
      errorMessage: '',
      queryLenght: Number,
      usersList: [],
      currentPage: 1
    }
  },
  methods: {
    async searchUser(user, pageNumber){
      console.log(this.currentPage)
      try {
        const query = await axios.get('https://api.github.com/search/users', { params: { q: user, page: pageNumber, per_page: 20} })
        this.requestError = false
        this.usersList = []

        const response = query.data.items
        this.queryLenght = response.length

        let userFound = {}
        response.forEach((item) => {
          userFound = {name: item.login, avatar: item.avatar_url, link: item.html_url}
          this.usersList.push(userFound)
        })

      }catch (error) {
        console.log(error)
        this.requestError = true
        this.requestStatus = error.response.status
        this.errorMessage = error.response.data.message
      }
    },

    increasePage(){
      return this.currentPage += 1
    },

    decreasePage(){
      if(this.currentPage - 1 >= 1) return this.currentPage -= 1
      return this.currentPage
    }
  }
})

app.mount('#app')