<template>
    <div class="all-news-page container mt-5">
      <!-- Latest News -->
      <div class="latest-news card p-3 mb-5">
        <h2 class="text-center">Latest News</h2>
        <div v-if="latestNews" class="card-body">
          <h4 class="card-title">{{ latestNews.title }}</h4>
          <p class="card-text text-muted">By {{ latestNews.author }}</p>
          <p class="card-text">{{ formatDate(latestNews.createdAt) }}</p>
          <router-link
            :to="`/news/${latestNews.id}`"
            class="btn btn-primary"
          >
            Read More
          </router-link>
        </div>
        <div v-else class="text-center">No latest news available.</div>
      </div>
  
      <!-- All News -->
      <h2 class="mb-4">All News</h2>
      <ul class="list-group">
        <li
          v-for="item in newsList"
          :key="item.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <h5 class="mb-1">{{ item.title }}</h5>
            <small class="text-muted">By {{ item.author }}</small>
          </div>
          <router-link
            :to="`/news/${item.id}`"
            class="btn btn-outline-primary"
          >
            Read More
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        newsList: [],
        latestNews: null,
        isLoading: false,
        error: null,
      };
    },
    methods: {
      async fetchNews() {
        this.isLoading = true;
        try {
          const [allNews, latestNews] = await Promise.all([
            axios.get("http://localhost:5217/api/News"),
            axios.get("http://localhost:5217/api/News/latest"),
          ]);
          this.newsList = allNews.data;
          this.latestNews = latestNews.data;
        } catch (err) {
          this.error = "Error fetching news data.";
        } finally {
          this.isLoading = false;
        }
      },
      formatDate(date) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
    mounted() {
      this.fetchNews();
    },
  };
  </script>
  
  <style scoped>
  .all-news-page {
    font-family: Arial, sans-serif;
  }
  
  .latest-news {
    background: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .list-group-item {
    background-color: #fff;
    border: 1px solid #ccc;
  }
  
  .btn-outline-primary {
    margin-left: auto;
  }
  </style>
  