const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

/** Return the sum of likes from the list of blogs */
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

/** Return the blog with the most likes */
const favouriteBlog = (blogs) => {
    return blogs.reduce((previous, current) => {
        return (previous && previous.likes > current.likes) ? previous : current
    }, null)
}

/** Return the name of the author with the most blogs, returning */
const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) return null

    var authorWithMostBlogs = {
        'author': '',
        'blogs': 0
    }

    // Iterate the list of blogs once to count the number of blogs written by each author
    // and keep track of the author with the most blogs
    var blogCount = {}
    _.each(blogs, (value, index) => {
        blogCount[value.author] = blogCount[value.author] ? blogCount[value.author] + 1 : 1

        if (blogCount[value.author] > authorWithMostBlogs.blogs) {
            authorWithMostBlogs = {
                'author': value.author,
                'blogs': blogCount[value.author]
            }
        }
    })

    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) return null

    var authorWithMostLikes = {
        'author': '',
        'likes': 0
    }

    // Iterate the list of blogs once to sum the likes from blogs by each author
    // and keep track of the author with the most likes
    var likeCount = {}
    _.each(blogs, (value, index) => {
        likeCount[value.author] = likeCount[value.author] ? likeCount[value.author] += value.likes : value.likes

        if (likeCount[value.author] > authorWithMostLikes.likes) {
            authorWithMostLikes = {
                'author': value.author,
                'likes': likeCount[value.author]
            }
        }
    })

    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}