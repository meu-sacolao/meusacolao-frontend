export default () => {

  if(process.client) {
    const router = useRouter()

    router.afterEach((to) => {
      /**
       * Scroll to top on route change
      */
      setTimeout(() => {
        const mainContent = document.getElementById('body')
        if(mainContent) {
          document.getElementById('body').scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }
      }, 100)

    })
  }
}