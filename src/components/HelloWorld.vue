<template>
  <div class="hello">
    <ul>
      <li v-for="(item, i) in items" :key="item.guid" v-on:click='setActive(i)'>
        <img :src="[item.thumbnail ? item.thumbnail : './quepal.jpg']">
        <div class="title">{{ item.title }}</div>
        <div v-bind:class="[i === index ? 'content_action active' : 'content_action']">
          <div class="content_action--btn" v-on:click='addToTrello(item)'><i class="material-icons">add_circle</i></div>
          <a class="content_action--btn" :href='item.link' target="_blank"><i class="material-icons">remove_red_eye</i></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import curl from 'curl'

let getItem = async function (url, call) {
  const feed = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURI(url)
  await curl.getJSON(feed, function(err, response, data) {
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
      items : [],
      index : undefined
    }
  },
  created () {
    const feeds = [
      'https://www.blogdumoderateur.com/feed/',
      'https://www.presse-citron.net/feed/',
      'https://hitek.fr/rss',
      'https://www.usine-digitale.fr/rss',
      'http://www.florianperrier.com/feed/',
      'https://www.blogduwebdesign.com/feed/'
    ]

    let items = null;
    feeds.map((feed) => {
      getItem(feed, (data) => {
        if (!items) {
          return items = data.items
        }
        items = items.concat(data.items)
        this.items = items;
      })
    })
  },
  methods: {
    setActive(i) {
      if (i === this.index) {
        this.index =  undefined
      }

      this.index =  i
    },
    addToTrello (item) {
      const title = encodeURI(item.title)
      const link = encodeURI(item.link)

      let url = "https://api.trello.com/1/cards?name="+ title +"&desc="+ link +"&pos=top&idList=5d24e8a7b078477abd73eb13&keepFromSource=all&key=eafa818967fa7706d183623c7b600845&token=936d0cba9ab566c3bffd1d18626663680f74db6ae9e2d14e262630fcccab04ef"
      curl.post(url, function(err, response, data) {
        console.log(err, response, data)
      });
    }
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
.content_action.active{
  transition: 0.3s;
  position: absolute;
  z-index: 999;
  top: 35%;
  left: 50%;
  width: 400px;
  margin-left: -200px;
}
.content_action--btn{
  transition: 3s;
  display: inline-block;
  color: white;
  background-color: #5EEB5B;
  border-radius: 50%;
  margin: 20px;
  padding: 22px;
  cursor: pointer;
  width: 30px;
  height: 30px;
}
</style>
