export default () => {

  if(process.client) {
    const router = useRouter()

    router.beforeEach(() => {

      /**
       * Scroll to top on route change
      */
      setTimeout(() => {
        const mainContent = document.getElementById('main-content')
        if(mainContent) {
          document.getElementById('main-content').scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }
      }, 100)

    })
  }
}