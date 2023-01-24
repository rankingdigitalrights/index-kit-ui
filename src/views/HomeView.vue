<script setup lang="ts">
import { NLayoutContent, NH1, NP } from 'naive-ui';
</script>

<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div class="section-content">
      <n-h1>
        Preparing data infrastructure
      </n-h1>
      <n-p>
        The recommended tool to conduct the data collection process is Google Sheets, because most people are familiar with spreadsheets and also it supports real time collaborative editing.
      </n-p>
      <n-p>
        In order to make these spreadsheets, RDR developed some supporting tools that help and automates the creation process.
      </n-p>
      <n-h1>
        Creating JSON configuration files
      </n-h1>
      <n-p>
        First, you need to be clear about every aspect of your adaptation, that includes which indicators, what companies, and how many steps your adaptation will take.
      </n-p>
      <n-p>
        Go to <a href="https://rankingdigitalrights.github.io/index-kit-web">https://rankingdigitalrights.github.io/index-kit-web</a>
      </n-p>
    </div>
  </n-layout-content>
</template>
