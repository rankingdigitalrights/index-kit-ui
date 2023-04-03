<template>
  <n-layout-content :native-scrollbar="false" width="55%">
    <div class="section-content">
      <n-h1>Workspace setup</n-h1>
      <n-p>
        Now that you have created all of your configuration files, you need to ensure  you have somewhere to store all of this data and where all data collection spreadsheets will be generated. You will need a Google account to use the following required tools: Google Drive and Google Apps Scripts.
      </n-p>
      <n-h2>
        Google Drive folder
      </n-h2>
      <n-p>
        Go to Google Drive and create a new folder. Inside of this folder you will create all your data collection and scoring sheets. When you have your folder ready, right click on it and select “Get link.”
      </n-p>
      <n-grid cols="1" item-responsive responsive="screen">
      <n-grid-item span="0 m:1 l:2">
      <div class="pic01">
      <n-image 
        :src="pic01"
      />
      </div>
      </n-grid-item>
      </n-grid>
      <n-p>
        You will see a link like this:
      </n-p>
      <n-p>
        https://drive.google.com/drive/folders/<span style="color:red">12QxxUY31XX9D2rwnVIJ-e56GApbi99NV</span>?usp=sharing
      </n-p>
      <n-p>
        In this example, the folder ID is highlighted in red:
      </n-p>
      <n-code
        code="12QxxUY31XX9D2rwnVIJ-e56GApbi99NV"
      />
      <n-p>
        Grab your ID and save it, you will need it later.
      </n-p>
      <n-p>
        Finally, upload inside this folder the “config.json” and “companies.json” files created in the “General Settings” and “Companies and services” sections.
      </n-p>
      <n-h2>
        Script setup
      </n-h2>
      <n-p>
        All the spreadsheets are created automatically by running a script, based on the two json files you created earlier and subsequently uploaded.
      </n-p>
      <n-h3>
        Spreadsheet types description
      </n-h3>
      <n-p>
        There are three types of spreadsheets involved in the research process:
      </n-p>
      <ul>
        <li>
          Data collection sheets: Researchers work on these spreadsheets filling them based on the results they get from the company's policies.
        </li>
        <li>
          Scoring sheets: They get data filled on the Data collection sheets and calculate scores for every indicator.
        </li>
        <li>
          Summary sheets: They have all scores from a complete step. These are used to analyze the results of the research.
        </li>
      </ul>
      <n-h3>
        Getting the code
      </n-h3>
      <n-p>
        RDR developed all needed scripts for your research as a
        <a href="https://www.google.com/script/start/" target="_blank">Google Apps Scripts</a>
        project. This allows you to automate the spreadsheets generation. To go to the project, visit:
      </n-p>
      <n-p>
        <a href="https://script.google.com/d/1D-U42uZq7au4RKthZFkMF1q4INOQNNfY8bPTcqIZDLdynBu6IVQ8cBfo/edit?usp=sharing" target="_blank">
          https://script.google.com/d/1D-U42uZq7au4RKthZFkMF1q4INOQNNfY8bPTcqIZDLdynBu6IVQ8cBfo/edit?usp=sharing
        </a>
      </n-p>
      <n-grid cols="4" item-responsive responsive="screen">
      <n-grid-item span="0 m:1 l:2">
      <div class="pic02">
      <n-image
        :src="pic02"
      />
      </div>
      </n-grid-item>
      </n-grid>
      <n-p>
        Press the “copy” button (an icon in the shape of two sheets of paper) on the left of the star icon at the upper-right corner of the screen. It will open a new browser tab with an editable copy of the project code.
      </n-p>
      <n-p>
        Next,  go to the “Code section” (Clicking on the “&lt;&gt;” icon on the left menu) and you will see the following:
      </n-p>
      <n-grid cols="1" item-responsive responsive="screen">
      <n-grid-item span="0 m:1 l:2">
        <div class="pic03">
        <n-image
          :src="pic03"
        />
        </div>
      </n-grid-item>
      </n-grid>
      <n-p>
        On line 3, add the folder ID you saved before. In this example, this line would be replaced by:
      </n-p>
      <n-code
        code="return DriveApp.getFolderById('12QxxUY31XX9D2rwnVIJ-e56GApbi99NV')"
      />
      <n-p>
        Click “Save.”
      </n-p>
      <n-grid cols="2" item-responsive responsive="screen">
      <n-grid-item span="0 m:1 l:2">
        <div class="pic04">
        <n-image 
          :src="pic04"
          />
        </div>
      </n-grid-item>
      </n-grid>
      <n-h2>
        Running the code
      </n-h2>
      <n-p>
        First, select the startProject function (1) and then run it (2).
      </n-p>
      <n-grid cols="2" item-responsive responsive="screen">
        <n-grid-item span="0 m:1 l:2">
          <div class="pic05">
      <n-image
        :src="pic05"
      />
          </div>
        </n-grid-item>
      </n-grid>
      <n-p>
        You will now be creating the data collection sheets. Select the “mainInputSheets” function and run it. You will see the data collection sheets have now been created within the adaptation folder. You can move those files into a subfolder or rename them.
      </n-p>
      <n-p>
        Do the same for the scoring sheets using the mainScoringSheets function.
      </n-p>
      <n-p>
        Lastly, create the summary using the mainSummarySheets function.
      </n-p>
      <n-h2>Note about Google Apps Script</n-h2>
      <n-p>
        Apps Script has limitations to its individual free Google accounts (you can check them
        <a href="https://developers.google.com/apps-script/guides/services/quotas" target="_blank">here</a>). We therefore recommended that you use a workspace account. However, a normal gmail account should be enough to create an adaptation project with a small number of companies and indicators.
      </n-p>
    </div>
  </n-layout-content>
</template>

<script setup lang="ts">
import { NLayoutContent, NCode, NH1, NH2, NH3, NImage, NP } from 'naive-ui';
import pic01 from '../assets/tutorial/01-drive-folder.png';
import pic02 from '../assets/tutorial/02-project-overview.png';
import pic03 from '../assets/tutorial/03-project-code.png';
import pic04 from '../assets/tutorial/04-gas-toolbar.png';
import pic05 from '../assets/tutorial/05-gas-run-png.png';
</script>

<style lang="scss">

.pic01 {
  display: flex;
  align-items: left;
  height:auto;
  width: 35cqmin;
}
.pic02 {
  display: flex;
  align-items: left;
  height:23cqmax;
  width: auto;
}
.pic03 {
  display: flex;
  align-items: left;
  height:23cqmax;
  width: auto;
  }
.pic04 {
  display: flex;
  align-items: left;
  width:20cqmax;
  }
.pic05 {
  display: flex;
  align-items: left;
  max-height:500px;
  width: auto;
  }
</style>
