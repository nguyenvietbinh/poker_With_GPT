<template>
    <div>
      <!-- Display the animated counter value -->
      <h1>{{ displayCount }}</h1>
      <!-- Button to trigger the counter animation -->
      <button @click="startCounting">Start Count</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      // `count` will be the current displayed number in the animation
      const displayCount = ref(0);
  
      // `targetCount` is the final number we want to reach
      const targetCount = 2000;
  
      // `duration` defines how long the count animation should last (in milliseconds)
      const duration = 500;
  
      // Function to start the count animation
      function startCounting() {
        // Set initial time for the count animation
        const startTime = performance.now();
        
        // `updateCount` is the function that updates `displayCount` at each animation frame
        function updateCount(currentTime) {
          // Calculate the elapsed time since the animation started
          const elapsedTime = currentTime - startTime;
          
          // Calculate the progress percentage based on the elapsed time
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Update `displayCount` based on the progress (ease-out effect)
          displayCount.value = Math.floor(progress * targetCount);
  
          // Continue updating until the progress reaches 1 (100%)
          if (progress < 1) {
            // Use `requestAnimationFrame` to update `displayCount` smoothly
            requestAnimationFrame(updateCount);
          }
        }
  
        // Start the first animation frame
        requestAnimationFrame(updateCount);
      }
  
      // Return the reactive properties and methods to use in the template
      return {
        displayCount,
        startCounting,
      };
    },
  };
  </script>
  