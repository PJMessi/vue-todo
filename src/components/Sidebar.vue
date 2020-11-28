<template>
  <div class="page-sidebar">
    <div class="logo-box">
      <a href="#" class="logo-text">Connect</a
      ><a href="#" id="sidebar-close"><i class="material-icons">close</i></a>
      <a href="#" id="sidebar-state"
        ><i class="material-icons">adjust</i
        ><i class="material-icons compact-sidebar-icon">panorama_fish_eye</i></a
      >
    </div>
    <div class="page-sidebar-inner slimscroll">
      <ul class="accordion-menu">
        <li class="sidebar-title">Apps</li>
        
        <li>
          <a href="index.html" class="active"
            ><i class="material-icons-outlined">dashboard</i>Dashboard</a
          >
        </li>
        
        <li>
          <a href="profile.html"
            ><i class="material-icons-outlined">account_circle</i>Profile</a
          >
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>