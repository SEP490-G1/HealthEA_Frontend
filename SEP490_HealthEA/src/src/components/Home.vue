<template>
    <!-- <div class="auth-wrapper" style="padding-top: 200px;">
        <div class="auth-inner">
            <h3>Welcome to Appartment Management System</h3>
            <h3 v-if="user">Hi, {{ user.username }}</h3>
            <h3 v-if="!user">Please log in to explore more!</h3>
        </div>
    </div> -->
    <div>
        <!-- Hero Section (Main image and title) -->
        <section class="hero-section text-center">
            <div class="container">
                <h1 class="display-4">{{ $t('title') }}</h1>
                <p class="lead" v-if="user">{{ $t('welcome') }}{{ user.username }}</p>
                <button class="btn btn-dark btn-lg">{{ $t('slogan') }}</button>
            </div>
        </section>

        <!-- Services for Owners and Tenants Section -->
        <!-- <section class="services-section py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="service-box p-4 text-center bg-primary text-white">
                            <h4>SERVICES FOR OWNERS</h4>
                            <p>Discover why Las Vegas Owners & Investors trust us for all their property management
                                needs.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="service-box p-4 text-center bg-dark text-white">
                            <h4>SERVICES FOR TENANTS</h4>
                            <p>Only the highest quality Las Vegas Rentals plus the latest technology to pay rent and
                                submit
                                maintenance requests.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
    </div>
</template>

<script>
export default {

    name: 'Home',
    props: ['user']

}
</script>

<style>
.hero-section {
    background-image: url('D:\VMO\FE\Auth\source\src\components\style\img\homepage.jpg'); /* Hình nền lấy từ ảnh bạn tải lên */
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .hero-section h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  
  .hero-section p {
    font-size: 1.25rem;
  }
  
  .service-box {
    margin-top: 20px;
    border-radius: 8px;
  }
  </style>