
export const showBlogForm = () => {
  return {
    type: 'SHOW_BLOG_FORM'
  }
}

export const hideBlogForm = () => {
  return {
    type: 'HIDE_BLOG_FORM'
  }
}

const blogFormReducer = (state = {visible: false}, action) => {
  console.log('ACTION:', action)
  switch (action.type) {
    case 'SHOW_BLOG_FORM':
      return {visible: true}
    case 'HIDE_BLOG_FORM':
      return {visible: false}
    default:
      return state
  }
}

export default blogFormReducer