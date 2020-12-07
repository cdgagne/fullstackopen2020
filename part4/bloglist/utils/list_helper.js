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

    // Iterate the list of blogs once to count the number of blogs written by each author
    var authors = {}
    _.each(blogs, (value, index) => {
        authors[value.author] = authors[value.author] ? authors[value.author] + 1 : 1
    })

    // Iterate the collection of authors to find the one with the most blogs
    var authorWithMostBlogs = {
        'author': '',
        'blogs': 0
    }
    _.each(authors, (value, key) => {
        if (authors[key] > authorWithMostBlogs.blogs) {
            authorWithMostBlogs = {
                'author': key,
                'blogs': authors[key]
            }
        }
    })
    return authorWithMostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}