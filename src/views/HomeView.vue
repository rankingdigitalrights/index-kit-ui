<script setup lang="ts">
import { NLayoutContent, NH1, NP } from 'naive-ui';
</script>

<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div class="section-content">
      <n-h1> RDR Index Kit UI </n-h1>
      <n-p>
        This tool will help you create two configuration files needed to create
        all the adaptation spreadsheets. Go to “General settings” and create
        your first JSON file with the main parameters. Then, go to “Companies
        and services” and create the second JSON file with all the companies and
        services to evaluate. You can find further help on their respective
        sections. Lastly, you can follow the instructions in “Workspace setup”
        to generate all working spreadsheets in Google Drive.
      </n-p>
      <n-p>
        The RDR Index Toolkit UI is a web tool created to help independent
        researchers and organizations to generate configuration files needed to
        deploy the data infrastructure. All data is handled in the web browser.
        No one, neither RDR nor any other entity, stores or has access to the
        information entered in the fields present in this tool.
      </n-p>
      <n-p>
        For more information about the RDR Methodology and research process, go
        to our
        <a href="https://rankingdigitalrights.org/research-lab/" target="_blank"
          >Research Lab</a
        >.
      </n-p>
    </div>
  </n-layout-content>
</template>
