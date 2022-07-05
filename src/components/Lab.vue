<script setup lang="ts">
import type OLMap from 'ol/Map';
import loader from './loader.vue';

defineProps<{
  map: OLMap;
}>();
</script>

<template>
  <div class="panel right">
    <div class="tabs">
      <div :class="{ selected: tab === 'fetch' }" @click="tab = 'fetch'">Fetch</div>
      <div :class="{ selected: tab === 'parse' }" @click="tab = 'parse'">Parse</div>
      <div :class="{ selected: tab === 'edit' }" @click="tab = 'edit'">Edit</div>
    </div>

    <div class="container">
      <div v-show="tab === 'fetch'">
        <textarea class="code" v-model="overpassCode"></textarea>
        <div class="button" :class="{ disabled: loading }" @click="sendRequest">
          {{ !loading ? 'Fetch' : 'Fetching...' }}
        </div>

        <loader v-if="loading"/>
        <div class="overpassResults" v-else>
          <div class="keyVals">
            <div class="keyVal">
              <div>Relations</div>
              <div>{{ overpassResult.filter((r) => r.type === 'relation').length }}</div>
            </div>
            <div class="keyVal">
              <div>Ways</div>
              <div>{{ overpassResult.filter((r) => r.type === 'way').length }}</div>
            </div>
            <div class="keyVal">
              <div>Nodes</div>
              <div>{{ overpassResult.filter((r) => r.type === 'node').length }}</div>
            </div>
          </div>

          <div class="relations">
            <div v-for="rel in overpassResult.filter((r) => r.type === 'relation')">
              <div class="keyVal">
                <div>ID</div>
                <div>{{ rel.id }}</div>
              </div>
              <div class="keyVal sep">
                <div>Members</div>
                <div>{{ rel.members.length }}</div>
              </div>
              <div v-for="tagVal, tagName in rel.tags" style="text-align: left">
                <span style="opacity:0.7">{{ tagName }}: </span>
                <span style="">{{ tagVal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    tab: 'fetch',
    loading: false,
    overpassCode: localStorage.getItem('overpassCode') || `/*
This query looks for nodes, ways and relations 
with the given key/value combination.
Choose your region and hit the Fetch button above!
*/
[out:json][timeout:25];
(
  relation["route"="tram"]({{bbox}});
  //relation["route"="tram"]["from"="Jacou"]["to"="Saint-Jean-de-Védas Centre"]({{bbox}});
);
// print results
out body;
>;
out skel qt;`,
    overpassResult: [],
  } as {
    tab: 'fetch' | 'parse' | 'edit';
    loading: boolean;
    overpassCode: string;
    overpassResult: Object[];
  }),

  watch: {
    overpassCode() {
      localStorage.setItem('overpassCode', this.overpassCode);
    },
  },

  methods: {
    async sendRequest() {
      const ext = this.map.getView().calculateExtent(this.map.getSize());
      const coords = `${ext[1]},${ext[0] - 431280},${ext[3]},${ext[2] - 431280}`;
      this.loading = true;
      const rs = await (await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `data=${encodeURIComponent(this.overpassCode.replace(/{{bbox}}/g, coords))}`,
      })).json();

      if (rs.elements) this.overpassResult = rs.elements;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  max-width: 700px;
  height: 100%;
  background-color: #ddddddd9;
  box-shadow: 0 0 10px #46464654;
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.tabs > div {
  padding: 8px;
  width: 100%;
  background-color: #cacaca94;
  cursor: pointer;
}

.tabs > div.selected {
  background-color: #c5c5c5ce;
}

.container {
  margin: 20px;
  height: calc(100vh - 75px);
}

.container > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
}

.code {
  width: 100%;
  min-height: 350px;
  border: none;
  font-family: monospace;
  font-size: 14px;
  padding: 20px;
  background-color: #bebebe94;
  border-radius: 5px;
  resize: none;
}

.code:hover { background-color: #c5c5c59a }

.button {
  padding: 10px;
  border-radius: 5px;
  background-color: #c5c5c5ce;
  cursor: pointer;
  width: 100%;
}

.button:hover { background-color: #c5c5c59a }
.button.disabled {
  background-color: #c5c5c5ce;
  cursor: not-allowed;
}

.overpassResults {
  width: 100%;
  margin-top: 5px;
  margin-bottom: -20px;
  overflow-y: auto;
  border-radius: 5px;
}

.relations {
  border-radius: 5px;
}

.relations > div, .keyVals {
  padding: 20px;
  margin-bottom: 10px;
  background-color: #bebebe94;
  border-radius: 5px;
}

.keyVal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.keyVal.sep { margin-bottom: 10px }
</style>
