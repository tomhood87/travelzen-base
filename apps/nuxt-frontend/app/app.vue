<script setup>
import { ref, onMounted } from 'vue'

const menu = ref({ title: '', alias: '', menuItems: [] })

onMounted(async () => {
  try {
    const res = await fetch('/api/menu')
    const json = await res.json()

    // Defensive: make sure listMenus and data exist
    const menus = json.data?.listMenus?.data
    if (menus && menus.length > 0) {
      menu.value = menus[0] // pick the first menu
    }
  } catch (err) {
    console.error('Failed to fetch menu', err)
  }
})
</script>

<template>
  <div>
    <nav>
      <h2>{{ menu.title }}</h2>
      <ul>
        <li v-for="item in menu.menuItems" :key="item.slug">
          <a :href="`/${item.slug}`">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
