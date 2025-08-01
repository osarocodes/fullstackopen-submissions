const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favouriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => {
    return blog.likes > fav.likes ? blog : fav
}, blogs[0])}


const mostBlogs = (blogs) => {
  const frequencyMap = {}
  let mostFrequentAuthor = { author: null, blogs: 0 }
  let maxCount = 0

  blogs.forEach(blog => {
    const currentAuthor = blog.author

    frequencyMap[currentAuthor] = (frequencyMap[currentAuthor] || 0) + 1

    if (frequencyMap[currentAuthor] > maxCount) {
      maxCount = frequencyMap[currentAuthor]
      mostFrequentAuthor = { author: currentAuthor, blogs: frequencyMap[currentAuthor] }
    }
  })
  return mostFrequentAuthor
}

const mostLikes = (blogs) => {
  const frequencyMap = {}
  let topAuthor = { author: null, likes: 0 }

  blogs.forEach(blog => {
    const currentAuthor = blog.author
    frequencyMap[currentAuthor] = (frequencyMap[currentAuthor] || 0) + blog.likes

    if (frequencyMap[currentAuthor] > topAuthor.likes) {
      topAuthor = { author: currentAuthor, likes: frequencyMap[currentAuthor]}
    }
  })
  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}