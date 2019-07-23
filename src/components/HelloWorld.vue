<template>
  <div class="hello">
    Result
  </div>
</template>

<script>
import Parser from 'rss-parser'

let getItem = async function (url) {
  let parser = new Parser()
  let feed = await parser.parseURL(url)
  console.log(feed.title)
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created () {
    getItem('http://feeds.feedburner.com/Pressecitron').then(item => {
     console.log(item);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
