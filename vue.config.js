module.exports = {
  devServer: {
    proxy: 'https://valmess-ecocup.github.io',
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog-rss/dist/'
    : '/'
}