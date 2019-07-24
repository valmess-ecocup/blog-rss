<template>
  <div class="hello">
    <ul>
      <li v-for="item in items" :key="item.guid">
        <img :src="item.thumbnail">
        <div class="title">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import curl from 'curl'

let getItem = async function (url, call) {
  const feed = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURI(url);
  await curl.getJSON(feed, function(err, response, data) {
    console.log(data)
    call(data)
  });
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      items : []
    }
  },
  created () {
    getItem('https://www.presse-citron.net/feed/', (data) => {
      this.items = data.items
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
  display: block;
  position: relative;
  margin: 10px;
  border-radius: 20px;
  overflow: hidden;
  min-height: 300px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  cursor: pointer;
  padding: 20px;
}
li:after{
  content: "";
  background-image: linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.6) 50%,rgba(0,0,0,.9) 100%);
  width: 100%;
  position: absolute;
  height: 200px;
  left: 0;
  bottom: 0;
}
img{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}
.title{
  color: #FFF;
  font-family: 'Anton', sans-serif;
  position: absolute;
  z-index: 99;
  font-size: 24px;
  max-width: 90%;
  text-align: left;
  bottom: 20px;
  left: 20px;
}
a {
  color: #FFF;
  text-decoration: none;
}
</style>
