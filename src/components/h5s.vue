<template>
  <div id="app" class="fix-header">
  <!-- <div class="preloader">
      <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
      </svg>
  </div> 
  -->
  <v-header></v-header>  
  <v-leftbar></v-leftbar> 

  <v-content></v-content>
  
  <footer class="footer text-center hidden-xs"> 2019 &copy; linkingvision.com </footer>
  </div>
</template>

<script>
// mdi https://cdn.materialdesignicons.com/1.7.22/
import Header from '@/components/header'
import LeftBar from '@/components/leftbar'
import Content from '@/components/content';
import Dashboard from '@/components/views/dashboard';
import Timeline from '@/components/widgets/timeline';
export default {
  name: 'H5S',
    components: {
        'v-header': Header,
        'v-leftbar': LeftBar,
        'v-content': Content,
        'v-dashboard': Dashboard,
        'v-timeline': Timeline
    }
}
</script>


