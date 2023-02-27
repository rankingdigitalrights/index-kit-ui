<script setup lang="ts">
import { NLayoutContent, NH1, NP } from 'naive-ui';
</script>

<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div class="section-content">
      <n-h1> RDR Index Kit UI </n-h1>
      <n-p>
        The RDR Index Toolkit UI is a web tool created to assist independent researchers and organizations in generating the configuration files needed to deploy their data infrastructure.
      </n-p>
      <n-p>
        This tool will help you produce the two configuration files needed to create all of your adaptation spreadsheets. To start, go to "General settings'' in the left-hand menu and create your first JSON file (config.json) with the main parameters of the research. Next, navigate over to "Companies and services'' and create the second JSON file (companies.json) with all the companies and services you’ll be evaluating. You can find further help in both sections. Lastly, you can follow the instructions under “Workspace setup” to generate all working spreadsheets in Google Drive.
      </n-p>
      <n-p>
        All data is handled in the web browser. No one–neither RDR nor any other entity–stores or has access to the information filled out in the fields provided by this tool.
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
